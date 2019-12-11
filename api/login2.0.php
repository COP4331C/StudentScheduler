<?php
include("config.php");
session_start();
$inData = json_decode(file_get_contents('php://input'), true);

$myusername = $inData["username"];
$mypassword = $inData["password"];

$sql = "SELECT * FROM users WHERE username = '{$myusername}' and password = '{$mypassword}'";
$result = mysqli_query($db,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
$active = $row['active'];

$count = mysqli_num_rows($result);

if($count == 1) {
         //session_register("myusername");
         $_SESSION['login_user'] = $myusername;
         $_SESSION['user_id'] = $row[id];
         //echo('yo');
	 $message = json_encode($row);
         header('Content-type: application/json');
         echo $message;


      }else {
         echo("hello darkness {$myusername}");
         $error = "Your Login Name or Password is invalid";

      }

?>
