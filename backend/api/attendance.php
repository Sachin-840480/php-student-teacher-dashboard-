<?php

require_once "../config/cors.php";
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

foreach ($data as $attendance) {

    $check = $conn->prepare("
        SELECT attendance_id
        FROM attendance
        WHERE student_id = ?
        AND attendance_date = ?
    ");

    $check->bind_param(
        "is",
        $attendance["student_id"],
        $attendance["attendance_date"]
    );

    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows == 0) {

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
            $attendance["student_id"],
            $attendance["attendance_date"],
            $attendance["status"]
        );

        $stmt->execute();
    }
}

echo json_encode([
    "success" => true,
    "message" => "Attendance Saved"
]);

break;

}

$conn->close();

?>