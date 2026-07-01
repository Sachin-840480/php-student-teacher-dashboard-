<?php

$conn = mysqli_connect(
"localhost",
"root",
"",
"student_teacher"
);

if(!$conn){
    die("Connection Failed");
}
