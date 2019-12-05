<?php

        $inData = json_decode(file_get_contents('php://input'), true);
        include("config.php");
        include("session.php");
        session_start();

        if ($inData['mon'] == '1')
        {
                $mon = '1';
        }

        else
        {
                $mon = '0';
        }


        if ($inData['tue'] == '1')
        {
                $tue = "1";
        }
        else
        {
                $tue = "0";
        }



        if ($inData['wen'] == 1)
        {
                $wen = '1';
        }
        else
        {
                $wen = '0';
        }

        if ($inData['thr'] == 1)
        {
                $thr = '1';
        }
        else
        {
                $thr = '0';
        }

        if ($inData['fri'] == 1)
        {
                $fri = '1';
        }
        else
        {
                $fri = '0';
        }


        if ($inData['sat'] == 1)
        {
                $sat = '1';
        }
        else
        {
                $sat = '0';
        }

        if ($inData['sun'] == 1)
        {
                $sun = '1';
        }
        else
        {
                $sun = '0';
        }







$sql = "insert into events (taskname, startdate, enddate, starttime, endtime, mon, tues, wen, thr, fri, sat, sun, userid) values ('{$inData['taskname']}', '{$inData['startdate']}', '{$inData['enddate']}', '{$inData['starttime']}', '{$inData['endtime']}', '{$mon}', '{$tue}', '{$wen}', '{$thr}', '{$fri}', '{$sat}', '{$sun}', '{$inData['userid']}')";

      $result = mysqli_query($db,$sql);
#$sql2 = "select id from events where userid = '{$inData['userid']}' and taskname = '{$inData['taskname']}' and startdate =  '{$inData['startdate']}' and enddate = '{$inData['enddate']}' and mon= '{$mon}' and tues = '{$tue}' and wen= '{$wen}'and thr = '{$thr}'and fri= '{$fri}' and sat = '{$sat}' and sun = '{$sun}' and starttime = '{$inData['starttime']}' and endtime = '{$inData['endtime']}'";
$sql2 = "select id from events where userid = '{$inData['userid']}' and taskname = '{$inData['taskname']}' and startdate =  '{$inData['startdate']}' and enddate = '{$inData['enddate']}' and mon= '{$mon}' and tues = '{$tue}' and wen= '{$wen}'and thr = '{$thr}'and fri= '{$fri}' and sat = '{$sat}' and sun = '{$sun}' and starttime = '{$inData['starttime']}' and endtime = '{$inData['endtime']}'";

$result2 = mysqli_query($db,$sql2);

if($result === TRUE)
{ 
     if($result2->num_row != 0)
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
