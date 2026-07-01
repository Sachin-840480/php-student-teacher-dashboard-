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

$conn->set_charset("utf8");