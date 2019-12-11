
<?php
	include("config.php");
	include("session.php");
	session_start();
     $inData = json_decode(file_get_contents('php://input'), true);
	$sql = "select * from events where id = '{$inData['id']}' ";
	$result = mysqli_query($db,$sql);
	$json_array = array();
	if($result->num_rows > 0)
	{
		$row = mysqli_fetch_assoc($result);
          	$message = json_encode($row);
     		header('Content-type: application/json');
     		echo $message;
	}
     else
     {
               $arr['none'] = 'There are no task';
               $message = json_encode($arr);
          	header('Content-type: application/json');
          	echo $message;
     }
?>
