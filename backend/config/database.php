<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "school_management";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database Connection Failed"
    ]));
}

<<<<<<< HEAD
$conn->set_charset("utf8");
=======
$conn->set_charset("utf8");
>>>>>>> c3b861ab30f1b0ec4f6f4ad523224e342e9f2c9c
