<?php
require_once __DIR__ . '/includes/data.php';
require_once __DIR__ . '/includes/header.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$meta = get_practical_meta($id);

// Load default code sample for the selected practical
$codePath = __DIR__ . '/samples/p' . $id . '.php';
$defaultCode = file_exists($codePath) ? file_get_contents($codePath) : "<?php\n// Code sample not found for Practical $id\n";
?>

<main class="container">
	<a href="index.php">&larr; Back</a>
	<h2>#<?php echo (int)$id; ?> — <?php echo htmlspecialchars($meta['title']); ?></h2>

	<div class="viewer">
		<div class="panel">
			<div class="panel-header">Code</div>
			<div class="panel-body">
				<form id="runForm" method="post" action="run.php">
					<input type="hidden" name="id" value="<?php echo (int)$id; ?>" />
					<textarea class="code" name="code" spellcheck="false"><?php echo htmlspecialchars($defaultCode); ?></textarea>
					<div class="controls">
						<button type="submit">Run Code</button>
						<button type="button" class="secondary" id="resetBtn">Reset</button>
					</div>
				</form>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">Output</div>
			<div class="panel-body">
				<iframe id="outputFrame" class="output" src="run.php?id=<?php echo (int)$id; ?>&sample=1"></iframe>
			</div>
		</div>
	</div>
</main>

<script>
const form = document.getElementById('runForm');
const frame = document.getElementById('outputFrame');
const resetBtn = document.getElementById('resetBtn');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = new FormData(form);
	fetch('run.php', { method: 'POST', body: data })
		.then(r => r.text())
		.then(html => { const blob = new Blob([html], {type:'text/html'}); frame.src = URL.createObjectURL(blob); });
});
resetBtn.addEventListener('click', () => { location.reload(); });
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>


