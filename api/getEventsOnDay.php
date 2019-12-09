<?php
	include("config.php");
	include("session.php");
	session_start();
     $inData = json_decode(file_get_contents('php://input'), true);

	$sql = "select * from events where userid = '{$_SESSION['user_id']}' and startdate <= '{$inData['date']}' and enddate >= '{$inData['date']}'";
	$result = mysqli_query($db,$sql);
	$json_array = array();

	if($result->num_rows > 0)
	{
		while($row = mysqli_fetch_assoc($result))
		{
			$json_array[] = $row;
		}
          $message = json_encode($json_array);
     	header('Content-type: application/json');
     	echo $message;
	}
     else
     {
               $arr['none'] = 'There are no events today yippie';
               $message = json_encode($arr);
          	header('Content-type: application/json');
          	echo $message;
     }

?>
