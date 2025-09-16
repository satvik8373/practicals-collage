<?php
require_once __DIR__ . '/includes/data.php';
require_once __DIR__ . '/includes/header.php';
?>

<main class="container">
	<h1>Department of Computer Science</h1>
	<p><strong>M.Sc. (CA&amp;IT)-I</strong> — P21A2WDT: Web Development Technologies</p>

	<div class="card">
		<div class="card-header">
			<h2>PHP Practicals</h2>
		</div>
		<div class="card-body">
			<ul class="practical-list">
				<?php foreach ($PRACTICALS as $idx => $p): $num = $idx + 1; ?>
					<li>
						<a class="practical-link" href="practical.php?id=<?php echo $num; ?>">
							<span class="practical-number">#<?php echo $num; ?></span>
							<span class="practical-title"><?php echo htmlspecialchars($p['title']); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>


