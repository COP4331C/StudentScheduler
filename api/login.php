<?php
   include("config.php");
   session_start();
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      //username and password sent from form 
      
      $myusername = mysqli_real_escape_string($db,$_POST['username']);
      $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
      
      $sql = "SELECT id FROM users WHERE username = '{$myusername}' and password = '{$mypassword}'";
      $result = mysqli_query($db,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $active = $row['active'];
      //$count = 2
      $count = mysqli_num_rows($result);
      

	#echo("dwdwed");      
      if($count == 1) {
         //session_register("myusername");
         $_SESSION['login_user'] = $myusername;
 	 $_SESSION['user_id'] = $row[id];
	 //echo('yo');
 	 header("location: mainConsole.php");
      }else {
	 echo('yo yo yo');
         $error = "Your Login Name or Password is invalid";
      }
   }
?>
