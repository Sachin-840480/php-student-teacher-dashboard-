<?php

require_once "config.php";

$conn = new mysqli(
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
);

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database Connection Failed"
    ]));
}

$conn->set_charset("utf8");




