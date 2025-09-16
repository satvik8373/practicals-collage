<?php
// 4) Registration -> confirmation -> report (simplified in one file for demo)
$step = $_POST['step'] ?? 'form';

if ($step === 'form') {
?>
<form method="post">
	<input type="hidden" name="step" value="confirm" />
	<label>Name: <input name="name" required></label><br>
	<label>Email: <input type="email" name="email" required></label><br>
	<label>Course: <input name="course" required></label><br>
	<button type="submit">Continue</button>
</form>
<?php } elseif ($step === 'confirm') { $name=htmlspecialchars($_POST['name']); $email=htmlspecialchars($_POST['email']); $course=htmlspecialchars($_POST['course']); ?>
<h3>Confirm your details</h3>
<ul>
	<li>Name: <?php echo $name; ?></li>
	<li>Email: <?php echo $email; ?></li>
	<li>Course: <?php echo $course; ?></li>
</ul>
<form method="post">
	<input type="hidden" name="step" value="report" />
	<input type="hidden" name="name" value="<?php echo $name; ?>" />
	<input type="hidden" name="email" value="<?php echo $email; ?>" />
	<input type="hidden" name="course" value="<?php echo $course; ?>" />
	<button type="submit">Submit</button>
</form>
<?php } else { $name=htmlspecialchars($_POST['name']); $email=htmlspecialchars($_POST['email']); $course=htmlspecialchars($_POST['course']); ?>
<h3>Registration Report</h3>
<table border="1" cellpadding="6"><tr><th>Field</th><th>Value</th></tr>
	<tr><td>Name</td><td><?php echo $name; ?></td></tr>
	<tr><td>Email</td><td><?php echo $email; ?></td></tr>
	<tr><td>Course</td><td><?php echo $course; ?></td></tr>
</table>
<?php } ?>


