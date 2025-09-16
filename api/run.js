// Vercel serverless function: proxies to Piston API to run PHP code
module.exports = async function (req, res) {
	// Basic CORS for local static hosting and cross-origin calls
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') {
		return res.status(204).end();
	}
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}
	try {
		const { language = 'php', version, files = [] } = req.body || {};
		const body = { language, files };
		if (version) body.version = version;
		const upstream = await fetch('https://emkc.org/api/v2/piston/execute', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
		const contentType = upstream.headers.get('content-type') || '';
		const isJson = contentType.includes('application/json');
		const payload = isJson ? await upstream.json() : { error: await upstream.text() };
		return res.status(upstream.ok ? 200 : upstream.status).json(payload);
	} catch (e) {
		return res.status(500).json({ error: String(e) });
	}
};


