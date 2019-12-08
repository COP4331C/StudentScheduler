<?php

        $inData = json_decode(file_get_contents('php://input'), true);
        include("config.php");
        include("session.php");
        session_start();

$sql = "insert into tasks (taskname, due, completed, userid) values ('{$inData['taskname']}', '{$inData['due']}', '{$inData['completed']}', '{$inData['userid']}')";

      $result = mysqli_query($db,$sql);
#$sql2 = "select id from events where userid = '{$inData['userid']}' and taskname = '{$inData['taskname']}' and startdate =  '{$inData['startdate']}' and enddate = '{$inData['enddate']}' and mon= '{$mon}' and tues = '{$tue}' and wen= '{$wen}'and thr = '{$thr}'and fri= '{$fri}' and sat = '{$sat}' and sun = '{$sun}' and starttime = '{$inData['starttime']}' and endtime = '{$inData['endtime']}'";
$sql2 = "select * from tasks where userid = '{$inData['userid']}' and taskname = '{$inData['taskname']}' and due =  '{$inData['due']}' and completed = '{$inData['completed']}'";

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
     echo $message;
}


?>
