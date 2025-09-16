<?php
// 3) User-defined functions for arithmetic
function add($a,$b){return $a+$b;}
function sub($a,$b){return $a-$b;}
function mul($a,$b){return $a*$b;}
function divi($a,$b){return $b==0? 'NaN': $a/$b;}

$a = isset($_GET['a'])? (float)$_GET['a'] : 10;
$b = isset($_GET['b'])? (float)$_GET['b'] : 5;
echo "a=$a, b=$b\n";
echo "add=".add($a,$b)."\n";
echo "sub=".sub($a,$b)."\n";
echo "mul=".mul($a,$b)."\n";
echo "div=".divi($a,$b)."\n";


