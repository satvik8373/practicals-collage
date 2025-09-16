// Minimal code runner using Piston API (https://github.com/engineer-man/piston)
// Works on static hosts like Vercel since it's client-side fetch

const pistonBase = 'https://emkc.org/api/v2/piston';

/**
 * Language map to Piston runtimes
 */
const LANGUAGE_TO_RUNTIME = {
  php: { pistonLanguage: 'php', extension: '.php', template: `<?php\n// Your PHP code here\necho \"Hello from PHP!\\n\";\n?>` },
  python: { pistonLanguage: 'python', extension: '.py', template: `print('Hello from Python')` },
  node: { pistonLanguage: 'javascript', extension: '.js', template: `console.log('Hello from Node');` },
  java: { pistonLanguage: 'java', extension: '.java', template: `public class Main { public static void main(String[] args){ System.out.println("Hello from Java"); } }` },
  c: { pistonLanguage: 'c', extension: '.c', template: `#include <stdio.h>\nint main(){ printf("Hello C\\n"); return 0; }` },
  cpp: { pistonLanguage: 'cpp', extension: '.cpp', template: `#include <bits/stdc++.h>\nusing namespace std; int main(){ cout<<"Hello C++\\n"; }` },
};

// Cache of language -> latest version string resolved from Piston /runtimes
const RUNTIME_VERSION_CACHE = {};

async function resolveVersionForLanguage(pistonLanguage) {
  if (RUNTIME_VERSION_CACHE[pistonLanguage]) return RUNTIME_VERSION_CACHE[pistonLanguage];
  const resp = await fetch(`${pistonBase}/runtimes`);
  if (!resp.ok) throw new Error(`Failed to fetch runtimes: HTTP ${resp.status}`);
  const runtimes = await resp.json();
  // Match by exact language or aliases
  const candidates = runtimes.filter(r => r.language === pistonLanguage || (Array.isArray(r.aliases) && r.aliases.includes(pistonLanguage)));
  if (!candidates.length) throw new Error(`No runtime found for '${pistonLanguage}'`);
  // Pick the one with highest version by semver-ish compare (fallback to first)
  const sorted = candidates.slice().sort((a,b) => String(b.version).localeCompare(String(a.version), undefined, { numeric: true, sensitivity: 'base' }));
  const chosen = sorted[0];
  RUNTIME_VERSION_CACHE[pistonLanguage] = chosen.version;
  return chosen.version;
}

const els = {
  list: document.getElementById('practicalsList'),
  search: document.getElementById('searchInput'),
  title: document.getElementById('practicalTitle'),
  prompt: document.getElementById('practicalPrompt'),
  editor: document.getElementById('editor'),
  stdin: document.getElementById('stdin'),
  output: document.getElementById('output'),
  runBtn: document.getElementById('runBtn'),
  langSelect: document.getElementById('languageSelect'),
};

let state = {
  currentId: null,
  language: 'php',
};

function setOutput(text) {
  els.output.textContent = text;
}

function renderList(filter = '') {
  const q = filter.trim().toLowerCase();
  els.list.innerHTML = '';
  PRACTICALS
    .filter(p => p.title.toLowerCase().includes(q) || String(p.id).includes(q))
    .forEach(p => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.innerHTML = `<span class="id">#${p.id}</span>${p.title}`;
      btn.addEventListener('click', () => selectPractical(p.id));
      li.appendChild(btn);
      els.list.appendChild(li);
    });
}

function loadSavedCode(practicalId, language) {
  const key = `code:p${practicalId}:${language}`;
  return localStorage.getItem(key);
}

function saveCode(practicalId, language, code) {
  const key = `code:p${practicalId}:${language}`;
  localStorage.setItem(key, code);
}

function selectPractical(id) {
  const p = PRACTICALS.find(x => x.id === id);
  if (!p) return;
  state.currentId = id;
  els.title.textContent = `#${p.id} — ${p.title}`;
  els.prompt.innerHTML = p.promptHtml;
  const lang = state.language;
  const starter = p.starters?.[lang] || LANGUAGE_TO_RUNTIME[lang].template;
  const saved = loadSavedCode(id, lang);
  els.editor.value = saved ?? starter;
  setOutput('');
}

async function runCode() {
  if (!state.currentId) {
    setOutput('Select a practical first.');
    return;
  }
  const langKey = state.language;
  const runtime = LANGUAGE_TO_RUNTIME[langKey];
  if (!runtime) {
    setOutput('Unsupported language runtime.');
    return;
  }

  const code = els.editor.value;
  const stdin = els.stdin.value;
  saveCode(state.currentId, langKey, code);

  els.runBtn.disabled = true;
  setOutput('Running...');
  try {
    const pistonLanguage = runtime.pistonLanguage;
    const version = await resolveVersionForLanguage(pistonLanguage);
    const body = {
      language: pistonLanguage,
      version,
      files: [{ name: `Main${runtime.extension}`, content: code }],
      stdin,
      compile_timeout: 10000,
      run_timeout: 10000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    };
    const resp = await fetch(`${pistonBase}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      let msg = `HTTP ${resp.status}`;
      try {
        const errJson = await resp.json();
        if (errJson && (errJson.message || errJson.error)) {
          msg += ` - ${(errJson.message || errJson.error)}`;
        }
      } catch (_) { /* ignore parse errors */ }
      throw new Error(msg);
    }
    const data = await resp.json();
    const out = [];
    if (data.compile && data.compile.stderr) out.push(data.compile.stderr);
    if (data.run && data.run.stdout) out.push(data.run.stdout);
    if (data.run && data.run.stderr) out.push(data.run.stderr);
    setOutput(out.join('\n').trim() || '[no output]');
  } catch (e) {
    setOutput(`Error: ${e.message}\nNote: Piston service availability can vary.`);
  } finally {
    els.runBtn.disabled = false;
  }
}

function onLanguageChange(value) {
  state.language = value;
  if (state.currentId) {
    // Re-load starter/saved for this language
    selectPractical(state.currentId);
  }
}

// Event bindings
els.search.addEventListener('input', (e) => renderList(e.target.value));
els.runBtn.addEventListener('click', runCode);
els.langSelect.addEventListener('change', (e) => onLanguageChange(e.target.value));

// Initial render
renderList('');


