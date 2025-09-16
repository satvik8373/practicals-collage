<?php
// 8) Polymorphism: Shape -> Rectangle, Circle
abstract class Shape { abstract public function area(); }
class Rectangle extends Shape { public $w,$h; public function __construct($w,$h){$this->w=$w;$this->h=$h;} public function area(){return $this->w*$this->h;} }
class Circle extends Shape { public $r; public function __construct($r){$this->r=$r;} public function area(){return pi()*$this->r*$this->r;} }

$rect = new Rectangle(5,3);
$circ = new Circle(4);
echo "Rectangle area=".$rect->area()."\n";
echo "Circle area=".number_format($circ->area(),2)."\n";


