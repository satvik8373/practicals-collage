<?php
// 2) if, elseif, switch demo
$input = $_GET['m'] ?? 'hello';

if ($input === 'hello') {
	echo "Hi there!\n";
} elseif ($input === 'bye') {
	echo "Goodbye!\n";
} else {
	echo "Default message.\n";
}

switch ($input) {
	case 'hello':
		echo "Switch: You said hello.";
		break;
	case 'bye':
		echo "Switch: You said bye.";
		break;
	default:
		echo "Switch: Unrecognized input.";
}


