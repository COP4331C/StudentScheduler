<?php
	include("config.php");
	include("session.php");
	session_start();
	$inData = json_decode(file_get_contents('php://input'), true);

     $sql = "delete from events where userid = '{$_SESSION['id']}' and taskname = '{$inData['taskname']}' ";
     $result = mysqli_query($db,$sql);
	if($result === TRUE)
	{
		$arr['success'] = 'success';
		$message = json_encode($arr);
		header('Content-type: application/json');
		echo $message;
	}
	else
	{
		$arr["error"] = 'error: it did not delete';
		$message = json_encode($arr);
		header('Content-type: application/json');
		echo $message;
	}
?>
