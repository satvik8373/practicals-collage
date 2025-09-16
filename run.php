<?php
// Executes either the default sample code for a practical or user-submitted code safely in an isolated buffer.
// Note: This is a minimal runner for local demo only. Do not expose publicly without hardening.

header('Content-Type: text/html; charset=UTF-8');

$id = isset($_REQUEST['id']) ? (int)$_REQUEST['id'] : 1;
$useSample = isset($_GET['sample']);

// Load code
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['code'])) {
	$code = (string)$_POST['code'];
} else {
	$path = __DIR__ . '/samples/p' . $id . '.php';
	$code = file_exists($path) ? file_get_contents($path) : "<?php echo 'No sample available.'; ?>";
}

// Run code in output buffer
ob_start();
try {
	// Create a temporary file to include
	$tmp = tempnam(sys_get_temp_dir(), 'run_');
	file_put_contents($tmp, $code);
	include $tmp;
} catch (Throwable $e) {
	echo '<pre style="color:#ef4444">Runtime Error: ' . htmlspecialchars($e->getMessage()) . '</pre>';
} finally {
	$output = ob_get_clean();
	@unlink($tmp ?? '');
}

// Wrap output in minimal HTML so iframe renders nicely
?>
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><style>body{margin:0;font-family:ui-monospace,Consolas,monospace;background:#0a0f1e;color:#e2e8f0}pre{white-space:pre-wrap}</style></head>
<body><?php echo $output; ?></body></html>


