<?php
	include("config.php");
	include("session.php");
	$inData = json_decode(file_get_contents('php://input'), true);
	
	$sql = "update tasks set name = '{$inData['name']}',  building = '{$inData['building']}', tasktime = '{$inData['tasktime']}', taskdate = '{$inData['taskdate']}', notes = '{$inData['notes']}' where id = '{$inData['id']}' ";
	$sql2 = "select * from tasks where id = '{$inData['id']}'";
	$result = mysqli_query($db,$sql);
	$result2 = mysqli_query($db,$sql2);
	if($result === TRUE)
	{
     		if($result_cnt = mysqli_num_rows($result2) == 1)
     		{
          		$row = $result2->fetch_assoc();
          		$message = json_encode($row);
          		header('Content-type: application/json');
          		echo $message;
     		}
     		else
     		{
          		$arr["error"] = 'error: cant find task';
          		$message = json_encode($arr);
          		header('Content-type: application/json');
          		echo $message;
     		}
	}
	else
	{
     		$arr["error"] = 'error: task did not get updated';
     		$message = json_encode($arr);
     		header('Content-type: application/json');
     		echo $message;
	}
?>
