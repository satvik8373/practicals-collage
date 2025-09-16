<?php
// 5) String functions
$s = $_GET['s'] ?? ' Hello World ';
echo "Original: [$s]\n";
echo "Trim: [".trim($s)."]\n";
echo "Length: ".strlen($s)."\n";
echo "Upper: ".strtoupper($s)."\n";
echo "Lower: ".strtolower($s)."\n";
echo "Replace: ".str_replace('World','PHP',$s)."\n";
echo "Substr(1,4): ".substr($s,1,4)."\n";


