<?php
	include("config.php");
	include("session.php");

	session_start();

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{

	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);

	$sql = "select * from events where userid = '{$_SESSION['user_id']}'";

	$result = mysqli_query($db,$sql);
	$json_array = array();
	// $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

	if($result->num_rows > 0)
	{
		while($row = mysqli_fetch($result))
		{
			$json_array[] = $row;
		}

	}

	header('Content-type: application/json');
	$message = json_encode($json_array);
	echo $message;

				// $row = $result->fetch_assoc();
				// $message = json_encode($row);
				// header('Content-type: application/json');
				// echo $message;


	}

?>
