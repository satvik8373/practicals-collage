<?php
// 1) Palindrome check
$number = $_GET['n'] ?? '121';
$num = (string)$number;
$isPalindrome = $num === strrev($num);
echo "Number: $num\n";
echo $isPalindrome ? "It is a palindrome" : "It is not a palindrome";


