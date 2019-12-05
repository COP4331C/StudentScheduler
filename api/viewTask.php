<?php
	include("config.php");
	include("session.php");

	session_start();

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
	
	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);

	$sql = "select * from events where taskname = '{$taskname}' and userid = '{$_SESSION['user_id']}'";
	
	$result = mysqli_query($db,$sql);
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);


      	echo($row["startdate"]);


	}

?>


