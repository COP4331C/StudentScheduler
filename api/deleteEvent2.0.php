<?php
	include("config.php");
	include("session.php");
	session_start();

     $sql = "delete from events where id = '{$inData['id']}' ";
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