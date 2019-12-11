<?php
	include("config.php");
	include("session.php");
	$inData = json_decode(file_get_contents('php://input'), true);

	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);
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

	$sql = "update events set startdate = '{$inData['startdate']}', enddate = '{$inData['enddate']}', starttime = '{$inData['starttime']}', endtime = '{$inData['endtime']}', mon = '{$mon}', tues = '{$tue}', wen = '{$wen}', thr = '{$thr}', fri = '{$fri}', sat = '{$sat}', sun = '{$sun}', building = '{$inData['building']}' where id = '$inData['id']' ";
      echo($sql);
	$result = mysqli_query($db,$sql);

?>
