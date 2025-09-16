<?php
// 9) Abstract class & implementation
abstract class Vehicle { abstract public function move(); }
class Car extends Vehicle { public function move(){ return 'Car drives'; } }
$v = new Car();
echo $v->move();


