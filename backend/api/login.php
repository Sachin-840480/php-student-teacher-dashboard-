<?php

require_once "../config/cors.php";
include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"]);
$password = trim($data["password"]);

$stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid Username"
    ]);

    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user["password"])) {

    echo json_encode([
        "success" => true,
        "message" => "Login Successful",
        "role" => $user["role"]
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Wrong Password"
    ]);
}

$conn->close();
