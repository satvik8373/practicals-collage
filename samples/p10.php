<?php
// 10) File upload (demo). For security, this writes to tmp directory.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
?>
<form method="post" enctype="multipart/form-data">
	<input type="file" name="f" required>
	<button type="submit">Upload</button>
</form>
<?php
} else {
	if (!isset($_FILES['f'])) { echo 'No file'; exit; }
	$target = sys_get_temp_dir() . DIRECTORY_SEPARATOR . basename($_FILES['f']['name']);
	if (move_uploaded_file($_FILES['f']['tmp_name'], $target)) {
		echo 'Uploaded to: ' . htmlspecialchars($target);
	} else {
		echo 'Upload failed';
	}
}


