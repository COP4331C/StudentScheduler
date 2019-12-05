<?php
	include("config.php");
	include("session.php");

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
	
	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);

        if ($_POST['mon'] == '1')
        {
                $mon = '1';
        }

        else
        {
                $mon = '0';
        }


        if ($_POST['tue'] == '1')
        {
                $tue = "1";
        }
        else
        {
                $tue = "0";
        }



        if ($_POST['wen'] == 1)
        {
                $wen = '1';
        }
        else
        {
                $wen = '0';
        }

        if ($_POST['thr'] == 1)
        {
                $thr = '1';
        }
        else
        {
                $thr = '0';
        }
        if ($_POST['fri'] == 1)
        {
                $fri = '1';
        }
        else
        {
                $fri = '0';
        }


        if ($_POST['sat'] == 1)
        {
                $sat = '1';
        }
        else
        {
                $sat = '0';
        }

        if ($_POST['sun'] == 1)
        {
                $sun = '1';
        }
        else
        {
                $sun = '0';
        }



	$sql = "update events set startdate = '{$_POST['startdate']}', enddate = '{$_POST['enddate']}', starttime = '{$_POST['starttime']}', endtime = '{$_POST['endtime']}', mon = '{$mon}', tues = '{$tue}', wen = '{$wen}', thr = '{$thr}', fri = '{$fri}', sat = '{$sat}', sun = '{$sun}' where taskname = '{$_POST['taskname']}' and userid = '{$_SESSION['user_id']}'";
      echo($sql);	
	$result = mysqli_query($db,$sql);



	}

?>


