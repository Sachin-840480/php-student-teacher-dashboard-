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

$data = json_decode(file_get_contents("php://input"), true);

/*
|--------------------------------------------------------------------------
| Check if attendance already exists
|--------------------------------------------------------------------------
*/

$check = $conn->prepare("
SELECT attendance_id
FROM attendance
WHERE student_id = ?
AND attendance_date = ?
");

$check->bind_param(
    "is",
    $data["student_id"],
    $data["attendance_date"]
);

$check->execute();

$result = $check->get_result();

if($result->num_rows > 0){

    echo json_encode([
        "success" => false,
        "message" => "Attendance Already Marked"
    ]);

    break;
}

/*
|--------------------------------------------------------------------------
| Insert attendance
|--------------------------------------------------------------------------
*/

$stmt = $conn->prepare("
INSERT INTO attendance(
student_id,
attendance_date,
status
)
VALUES(?,?,?)
");

$stmt->bind_param(
    "iss",
    $data["student_id"],
    $data["attendance_date"],
    $data["status"]
);

$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "Attendance Saved"
]);

break;

}

$conn->close();

?>