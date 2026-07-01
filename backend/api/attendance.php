<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET,POST,OPTIONS");

if($_SERVER['REQUEST_METHOD']=="OPTIONS"){
exit;
}

include("../config/database.php");

$method=$_SERVER['REQUEST_METHOD'];

switch($method){

case "GET":

$sql="SELECT attendance.*,students.student_name
FROM attendance
INNER JOIN students
ON attendance.student_id=students.student_id
ORDER BY attendance_date DESC";

$result=$conn->query($sql);

$data=[];

while($row=$result->fetch_assoc()){
$data[]=$row;
}

echo json_encode($data);

break;

case "POST":

$data=json_decode(file_get_contents("php://input"),true);

$stmt=$conn->prepare("INSERT INTO attendance(student_id,attendance_date,status)
VALUES(?,?,?)");

$stmt->bind_param(
"iss",
$data['student_id'],
$data['attendance_date'],
$data['status']
);

$stmt->execute();

echo json_encode([
"success"=>true,
"message"=>"Attendance Saved"
]);

break;

}

$conn->close();

?>