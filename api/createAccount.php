<?php

     include("config.php");
     include("session.php");
     $inData = json_decode(file_get_contents('php://input'), true);
     $email = $inData['email'];
     $username = $inData['username'];
     $password = $inData['password'];

     $sql = "insert into users (email, username, password) values('$email','$username','$password')";
     $result = mysqli_query($db,$sql);

     $sql2 = "select * from users where email = '{$email}' and username = '{$username}' and password ='{$password}'";
     $result2 = mysqli_query($db,$sql);

     if($result === TRUE)
     {
          if($result_cnt = mysqli_num_rows($result2) != 0)
          {
               $row = $result2->fetch_assoc();
               $message = json_encode($row);
               header('Content-type: application/json');
               echo $message;
          }
          else
          {
               $arr["error"] = 'error: account was not created';
               $message = json_encode($arr);
               header('Content-type: application/json');
               echo $message;
          }

     }
     else
     {
          $arr["error"] = 'error: unsuccessful insert';
          $message = json_encode($arr);
          header('Content-type: application/json');
          echo $message;
     }
?>
