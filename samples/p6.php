<?php
// 6) Arrays and functions
$students = [
	['name'=>'Asha','marks'=>82],
	['name'=>'Bala','marks'=>75],
	['name'=>'Chirag','marks'=>91],
];

usort($students, function($x,$y){ return $y['marks'] <=> $x['marks']; });
array_push($students, ['name'=>'Dev','marks'=>65]);
$names = array_column($students, 'name');

print_r($students);
echo "\nNames: ".implode(', ', $names);


