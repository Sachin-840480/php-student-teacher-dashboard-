<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");

if($_SERVER['REQUEST_METHOD']=="OPTIONS"){
    exit;
}

include("../config/database.php");

$method=$_SERVER['REQUEST_METHOD'];

switch($method){

case "GET":

if(isset($_GET["id"])){

$stmt=$conn->prepare("SELECT * FROM teachers WHERE teacher_id=?");

$stmt->bind_param("i",$_GET["id"]);

$stmt->execute();

$result=$stmt->get_result();

echo json_encode($result->fetch_assoc());

}else{

$result=$conn->query("SELECT * FROM teachers ORDER BY teacher_name");

$data=[];

while($row=$result->fetch_assoc()){
$data[]=$row;
}

echo json_encode($data);

}

break;

case "POST":

$data=json_decode(file_get_contents("php://input"),true);

$stmt=$conn->prepare("INSERT INTO teachers(teacher_name,mobile,address,subject,salary)
VALUES(?,?,?,?,?)");

$stmt->bind_param(
"ssssd",
$data['teacher_name'],
$data['mobile'],
$data['address'],
$data['subject'],
$data['salary']
);

$stmt->execute();

echo json_encode([
"success"=>true,
"message"=>"Teacher Added"
]);

break;

case "PUT":

$data=json_decode(file_get_contents("php://input"),true);

$stmt=$conn->prepare("UPDATE teachers
SET
teacher_name=?,
mobile=?,
address=?,
subject=?,
salary=?
WHERE teacher_id=?");

$stmt->bind_param(
"ssssdi",
$data['teacher_name'],
$data['mobile'],
$data['address'],
$data['subject'],
$data['salary'],
$data['teacher_id']
);

$stmt->execute();

echo json_encode([
"success"=>true,
"message"=>"Teacher Updated"
]);

break;

case "DELETE":

$id=$_GET['id'];

$stmt=$conn->prepare("DELETE FROM teachers WHERE teacher_id=?");

$stmt->bind_param("i",$id);

$stmt->execute();

echo json_encode([
"success"=>true,
"message"=>"Teacher Deleted"
]);

break;

}

$conn->close();

?>