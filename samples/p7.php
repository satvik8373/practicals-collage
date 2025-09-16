<?php
// 7) Inheritance: Person -> Teacher
class Person {
	public $name; public $age;
	public function __construct($name,$age){$this->name=$name;$this->age=$age;}
	public function intro(){return "$this->name ($this->age)";}
}
class Teacher extends Person {
	public $subject;
	public function __construct($name,$age,$subject){parent::__construct($name,$age);$this->subject=$subject;}
	public function intro(){return parent::intro()." teaches $this->subject";}
}

$t = new Teacher('Meera', 34, 'Web Tech');
echo $t->intro();


