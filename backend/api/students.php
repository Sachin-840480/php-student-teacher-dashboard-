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

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {

    case "GET":

        if(isset($_GET["id"])){

            $stmt=$conn->prepare("SELECT * FROM students WHERE student_id=?");
            $stmt->bind_param("i",$_GET["id"]);
            $stmt->execute();

            $result=$stmt->get_result();

            echo json_encode($result->fetch_assoc());

        }else{

            $result=$conn->query("SELECT * FROM students ORDER BY student_name");

            $students=[];

            while($row=$result->fetch_assoc()){
                $students[]=$row;
            }

            echo json_encode($students);
        }

        break;

    case "POST":

        $data = json_decode(file_get_contents("php://input"), true);

        $name = $data["student_name"];
        $father = $data["father_name"];
        $mobile = $data["mobile"];
        $alt = $data["alternate_mobile"];
        $address = $data["address"];
        $activity = $data["activity"];
        $fee = $data["fee"];

        $stmt = $conn->prepare("INSERT INTO students(student_name,father_name,mobile,alternate_mobile,address,activity,fee)
        VALUES(?,?,?,?,?,?,?)");

        $stmt->bind_param(
            "ssssssd",
            $name,
            $father,
            $mobile,
            $alt,
            $address,
            $activity,
            $fee
        );

        if ($stmt->execute()) {

            echo json_encode([
                "success" => true,
                "message" => "Student Added"
            ]);

        } else {

            echo json_encode([
                "success" => false
            ]);

        }

        break;

    case "PUT":

        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data["student_id"];
        $name = $data["student_name"];
        $father = $data["father_name"];
        $mobile = $data["mobile"];
        $alt = $data["alternate_mobile"];
        $address = $data["address"];
        $activity = $data["activity"];
        $fee = $data["fee"];

        $stmt = $conn->prepare("UPDATE students
        SET
        student_name=?,
        father_name=?,
        mobile=?,
        alternate_mobile=?,
        address=?,
        activity=?,
        fee=?
        WHERE student_id=?");

        $stmt->bind_param(
            "ssssssdi",
            $name,
            $father,
            $mobile,
            $alt,
            $address,
            $activity,
            $fee,
            $id
        );

        if ($stmt->execute()) {

            echo json_encode([
                "success" => true,
                "message" => "Student Updated"
            ]);

        }

        break;

    case "DELETE":

        $id = $_GET["id"];

        $stmt = $conn->prepare("DELETE FROM students WHERE student_id=?");

        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {

            echo json_encode([
                "success" => true,
                "message" => "Student Deleted"
            ]);

        }

        break;
}

$conn->close();

?>