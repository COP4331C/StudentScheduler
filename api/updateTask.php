<?php
	include("config.php");
	include("session.php");

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
	
	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);


	$sql = "update task set due = '{$_POST['due']}', completed = '{$_POST['completed']}' where taskname = '{$_POST['taskname']}' and userid = '{$_SESSION['userid']}'";
      echo($sql);	
	$result = mysqli_query($db,$sql);



	}

?>


