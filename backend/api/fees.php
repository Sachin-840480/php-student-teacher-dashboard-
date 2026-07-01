<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include("../config/database.php");

$method=$_SERVER['REQUEST_METHOD'];

switch($method){

case "GET":

$sql="SELECT
students.student_id,
students.student_name,
students.fee AS total_fee,
IFNULL(SUM(fee_payments.paid_fee),0) AS paid_fee,
(students.fee-IFNULL(SUM(fee_payments.paid_fee),0)) AS pending_fee
FROM students
LEFT JOIN fee_payments
ON students.student_id=fee_payments.student_id
GROUP BY students.student_id";

$result=$conn->query($sql);

$data=[];

while($row=$result->fetch_assoc()){
$data[]=$row;
}

echo json_encode($data);

break;

case "POST":

$data=json_decode(file_get_contents("php://input"),true);

$total=$data['total_fee'];

$stmt=$conn->prepare("INSERT INTO fee_payments(student_id,total_fee,paid_fee,payment_date,remarks)
VALUES(?,?,?,?,?)");

$stmt->bind_param(
"iddss",
$data['student_id'],
$total,
$data['paid_fee'],
$data['payment_date'],
$data['remarks']
);

$stmt->execute();

echo json_encode([
"success"=>true,
"message"=>"Payment Saved"
]);

break;

}

$conn->close();

?>
