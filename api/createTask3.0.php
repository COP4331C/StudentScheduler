<?php

        $inData = json_decode(file_get_contents('php://input'), true);
        include("config.php");
        include("session.php");
        session_start();

$sql = "insert into tasks (name, building, tasktime, taskdate, notes, userid) values ('{$inData['name']}', '{$inData['building']}', '{$inData['tasktime']}', '{$inData['taskdate']}', '{$inData['notes']}', '{$_SESSION["user_id"]}')";

      $result = mysqli_query($db,$sql);
#$sql2 = "select id from events where userid = '{$inData['userid']}' and taskname = '{$inData['taskname']}' and startdate =  '{$inData['startdate']}' and enddate = '{$inData['enddate']}' and mon= '{$mon}' and tues = '{$tue}' and wen= '{$wen}'and thr = '{$thr}'and fri= '{$fri}' and sat = '{$sat}' and sun = '{$sun}' and starttime = '{$inData['starttime']}' and endtime = '{$inData['endtime']}'";
	
	//$sql2 = "select * from tasks where userid = '{$inData['userid']}' and name = '{$inData['name']}' and building = '{$inData['building']}' and tasktime = '{$inData['tasktime']}' and taskdate = '{$inData['taskdate']}' and notes = {$inData['notes']}";

	/*
$result2 = mysqli_query($db,$sql2);

if($result === TRUE)
{ 
     if($result_cnt = mysqli_num_rows($result2) != 0)
     {
          $row = $result2->fetch_assoc();
          $eventid = $row["id"];
          $message = json_encode($row);
          header('Content-type: application/json');
          echo $message;

     }
     else
     {    
          $arr["error"] = 'ben was wrong, error: task did not get added also more or less then 1 copy';
          $message = json_encode($arr);
          header('Content-type: application/json');
          echo $message;
     }
}
else
{
     $arr["error"] = 'error: task did not get added';
     $message = json_encode($arr);
     header('Content-type: application/json');
     echo $sql;
}

	 */
?>
