<?php
	include("config.php");
	include("session.php");

	session_start();

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
	
	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);
      	$startdate = mysqli_real_escape_string($db,$_POST['startdate']);

      $sql = "delete from events where taskname = '{$taskname}' and userid = '{$_SESSION['user_id']}'";
      $result = mysqli_query($db,$sql);



	}

?>


