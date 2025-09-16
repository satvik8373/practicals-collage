// 26 practicals metadata with prompts and PHP starters. Other language starters fallback to runtime templates.

const PRACTICALS = [
  {
    id: 1,
    title: 'Check palindrome number using variables and conditionals',
    promptHtml: 'Develop a program that checks if a number is palindrome or not.',
    starters: {
      php: `<?php
$n = 121; // change to test
$orig = $n;
$rev = 0;
while ($n > 0) {
    $rev = $rev * 10 + ($n % 10);
    $n = intdiv($n, 10);
}
if ($rev === $orig) {
    echo "Palindrome"; 
} else {
    echo "Not Palindrome";
}
?>`
    }
  },
  {
    id: 2,
    title: 'Use if, else if, and switch to display messages',
    promptHtml: 'Write a program that uses if, else if, and switch to display messages based on input.',
    starters: {
      php: `<?php
$val = 2;
if ($val < 0) {
    echo "Negative\n";
} elseif ($val === 0) {
    echo "Zero\n";
} else {
    echo "Positive\n";
}
switch ($val) {
    case 1: echo "One\n"; break;
    case 2: echo "Two\n"; break;
    default: echo "Other\n"; 
}
?>`
    }
  },
  { id: 3, title: 'User-defined functions for arithmetic', promptHtml: 'Create functions add, sub, mul, div and use them.', starters: { php: `<?php
function add($a,$b){return $a+$b;} 
function sub($a,$b){return $a-$b;}
function mul($a,$b){return $a*$b;}
function divi($a,$b){ return $b==0? NAN : $a/$b; }
echo add(2,3)."\n";
echo sub(5,2)."\n";
echo mul(3,4)."\n";
echo divi(10,2)."\n";
?>` } },
  { id: 4, title: 'Registration to confirmation to report', promptHtml: 'Design a registration page that passes info to next page and then to report page; display neatly. (Simulate via arrays/printing since static hosting)', starters: { php: `<?php
$user = [ 'name' => 'Alice', 'email' => 'a@example.com', 'age' => 21 ];
echo "Confirmation Page\n"; 
foreach($user as $k=>$v){ echo ucfirst($k).": $v\n"; }
echo "\nReport Page\n";
printf("Name: %s\nEmail: %s\nAge: %d\n", $user['name'], $user['email'], $user['age']);
?>` } },
  { id: 5, title: 'String functions demo', promptHtml: 'Use strlen, strcmp, substr, str_replace, strtoupper, strtolower, trim, explode, implode.', starters: { php: `<?php
$s = "  Hello World  ";
echo strlen($s)."\n";
echo strcmp("abc","abd")."\n";
echo substr($s,2,5)."\n";
echo str_replace("World","PHP",$s)."\n";
echo strtoupper($s)."\n";
echo strtolower($s)."\n";
echo trim($s)."\n";
$parts = explode(" ", trim($s));
echo implode("-", $parts)."\n";
?>` } },
  { id: 6, title: 'Arrays and array functions', promptHtml: 'Store and display info using arrays; use sort, array_push, array_pop, count.', starters: { php: `<?php
$arr = [3,1,4];
array_push($arr, 1);
sort($arr);
echo 'Count: '.count($arr)."\n";
foreach($arr as $x) echo $x.' ';
?>` } },
  { id: 7, title: 'Classes: Person -> Teacher (inheritance)', promptHtml: 'Create parent Person and child Teacher with extra property/methods.', starters: { php: `<?php
class Person{ public $name; function __construct($n){$this->name=$n;} }
class Teacher extends Person{ public $subject; function __construct($n,$s){ parent::__construct($n); $this->subject=$s; } }
$t = new Teacher('John','Math');
echo $t->name.' - '.$t->subject; 
?>` } },
  { id: 8, title: 'Polymorphism: Shape -> Rectangle, Circle area()', promptHtml: 'Create Shape class with area(); override in Rectangle and Circle.', starters: { php: `<?php
abstract class Shape{ abstract public function area(); }
class Rectangle extends Shape{ function __construct(public $w, public $h){} function area(){ return $this->w*$this->h; } }
class Circle extends Shape{ function __construct(public $r){} function area(){ return pi()*$this->r*$this->r; } }
echo (new Rectangle(3,4))->area()."\n";
echo (new Circle(5))->area()."\n";
?>` } },
  { id: 9, title: 'Abstract class usage', promptHtml: 'Use an abstract class and implement it.', starters: { php: `<?php
abstract class Animal{ abstract public function speak(); }
class Dog extends Animal{ public function speak(){ return 'Woof'; } }
echo (new Dog())->speak();
?>` } },
  { id: 10, title: 'Upload file to directory', promptHtml: 'Demonstrate file upload logic (simulate due to static host).', starters: { php: `<?php
// Simulated: show how $_FILES would be processed
echo "Use move_uploaded_file(
    		n.tmp_name, '/path/upload/name'
    ) in real server.\n";
?>` } },
  { id: 11, title: 'Login with sessions', promptHtml: 'Create a login form that stores and retrieves session info. (Simulate prints since sessions need server).', starters: { php: `<?php
// session_start(); $_SESSION['username']='alice'; echo $_SESSION['username'];
echo "Sessions require server. Simulated username: alice\n";
?>` } },
  { id: 12, title: 'Order form with hidden field', promptHtml: 'Pass product ID via hidden field to confirmation (simulate variables).', starters: { php: `<?php
$productId = 1234; $userName='Alice';
echo "Confirm: $userName ordered product #$productId\n";
?>` } },
  { id: 13, title: 'PDO MySQL connect', promptHtml: 'Connect to MySQL via PDO and display success message. (Requires server + DB)', starters: { php: `<?php
try{
    // $pdo = new PDO('mysql:host=localhost;dbname=test','root','');
    // echo 'Connected';
    echo "PDO connection sample (commented)\n";
}catch(Exception $e){ echo $e->getMessage(); }
?>` } },
  { id: 14, title: 'Insert using PDO prepared statements', promptHtml: 'Form to insert using PDO prepared statements. (Pseudo-code)', starters: { php: `<?php
// $stmt = $pdo->prepare('INSERT INTO users(name,email) VALUES(?,?)');
// $stmt->execute(['Alice','a@example.com']);
echo "Prepared INSERT sample (commented)\n";
?>` } },
  { id: 15, title: 'Update/Delete using PDO', promptHtml: 'Update and delete employee record using PDO. (Pseudo-code)', starters: { php: `<?php
// $pdo->prepare('UPDATE emp SET name=? WHERE id=?')->execute(['Bob',1]);
// $pdo->prepare('DELETE FROM emp WHERE id=?')->execute([1]);
echo "Prepared UPDATE/DELETE sample (commented)\n";
?>` } },
  { id: 16, title: 'CRUD with dynamic CSS', promptHtml: 'Perform CRUD and display records with CSS. (Simulate array CRUD).', starters: { php: `<?php
$rows = [ ['id'=>1,'name'=>'A'], ['id'=>2,'name'=>'B'] ];
// Create
$rows[] = ['id'=>3,'name'=>'C'];
// Update id=2
foreach($rows as &$r){ if($r['id']==2){ $r['name']='B2'; }}
// Delete id=1
$rows = array_values(array_filter($rows, fn($r)=>$r['id']!=1));
foreach($rows as $r){ echo $r['id'].':'.$r['name']."\n"; }
?>` } },
  { id: 17, title: 'Read XML with simplexml_load_file()', promptHtml: 'Read an XML file and display contents. (Simulate string xml)', starters: { php: `<?php
$xmlStr = '<students><s><name>Alice</name></s><s><name>Bob</name></s></students>';
$xml = simplexml_load_string($xmlStr);
foreach($xml->s as $s){ echo (string)$s->name."\n"; }
?>` } },
  { id: 18, title: 'Create XML with SimpleXML', promptHtml: 'Create an XML and write student details.', starters: { php: `<?php
$xml = new SimpleXMLElement('<students/>' );
$s = $xml->addChild('student');
$s->addChild('name','Alice');
echo $xml->asXML();
?>` } },
  { id: 19, title: 'Associative array to JSON', promptHtml: 'Convert an associative array to JSON using json_encode().', starters: { php: `<?php
$data = ['name'=>'Alice','age'=>21];
echo json_encode($data);
?>` } },
  { id: 20, title: 'Send Email and SMS (Fast2SMS)', promptHtml: 'Demonstrate sending email and SMS API calls. (Pseudo, no keys).', starters: { php: `<?php
// mail('to@example.com','Hello','Body');
// Fast2SMS API call using cURL with API key header
echo "Email/SMS sample (commented)\n";
?>` } },
  { id: 21, title: 'Integrate payment (PayPal/Razorpay Sandbox)', promptHtml: 'Write steps to integrate sandbox payment on localhost.', starters: { php: `<?php
echo "Steps:\n1) Create Sandbox account\n2) Get keys\n3) Include SDK\n4) Create order\n5) Verify signature server-side\n";
?>` } },
  { id: 22, title: 'Server-side validation', promptHtml: 'Implement server-side validation in PHP.', starters: { php: `<?php
function validateRequired($v,$name){ if(trim($v)===''){ echo "$name required\n"; return false;} return true; }
$ok = validateRequired('Alice','Name') & validateRequired('', 'Email');
echo $ok?"OK":"Invalid";
?>` } },
  { id: 23, title: 'SQL Injection demo', promptHtml: 'Create a simple login and show injectable query (do NOT use in prod).', starters: { php: `<?php
$user = "admin' -- ";
$pass = 'x';
$query = "SELECT * FROM users WHERE username='$user' AND password='$pass'";
echo $query; // shows injection
?>` } },
  { id: 24, title: 'XSS demo', promptHtml: 'Inject a malicious <script> and see its effect (print escaped vs unescaped).', starters: { php: `<?php
$input = "<script>alert('XSS')</script>";
echo "Unsafe: \n".$input."\n";
echo "Safe: \n".htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
?>` } },
  { id: 25, title: 'Deploy from XAMPP to live server', promptHtml: 'Write steps to deploy PHP/MySQL app from XAMPP to live server.', starters: { php: `<?php
echo "Steps:\n1) Export DB (.sql)\n2) Upload files via FTP\n3) Import DB\n4) Update config (DB creds)\n5) Test\n";
?>` } },
  { id: 26, title: 'Export MySQL database to .sql', promptHtml: 'Write steps to export MySQL DB to .sql file.', starters: { php: `<?php
echo "Steps (phpMyAdmin):\n1) Open phpMyAdmin\n2) Select DB\n3) Export tab\n4) SQL format\n5) Go\n";
?>` } },
];


