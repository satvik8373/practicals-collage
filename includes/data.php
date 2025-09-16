<?php
$PRACTICALS = [
	['title' => 'Check if a number is palindrome'],
	['title' => 'Display messages using if/elseif/switch'],
	['title' => 'User-defined functions for arithmetic'],
	['title' => 'Registration to confirmation and report pages'],
	['title' => 'String functions demonstration'],
	['title' => 'Arrays and array functions'],
	['title' => 'OOP: Person and Teacher (inheritance)'],
	['title' => 'OOP: Shape, Rectangle, Circle with area()'],
	['title' => 'Abstract class usage and implementation'],
	['title' => 'File upload to directory'],
	['title' => 'Login with sessions'],
	['title' => 'Order form with hidden product ID'],
	['title' => 'PDO MySQL connect success message'],
	['title' => 'Insert form using PDO prepared statements'],
	['title' => 'Update/Delete employee using PDO'],
	['title' => 'CRUD app with dynamic CSS records'],
	['title' => 'Read XML using simplexml_load_file()'],
	['title' => 'Create XML using SimpleXML'],
	['title' => 'Associative array to JSON using json_encode()'],
	['title' => 'Send email and SMS (Fast2SMS API)'],
	['title' => 'Integrate payment (PayPal/Razorpay) — steps'],
	['title' => 'Server-side validation in PHP'],
	['title' => 'SQL Injection demo'],
	['title' => 'XSS script injection demo'],
	['title' => 'Deploy PHP/MySQL app from XAMPP to live'],
	['title' => 'Export MySQL database to .sql — steps'],
];

function get_practical_meta(int $id): array {
	global $PRACTICALS;
	$idx = $id - 1;
	if ($idx < 0 || $idx >= count($PRACTICALS)) {
		return ['title' => 'Unknown Practical'];
	}
	return $PRACTICALS[$idx];
}


