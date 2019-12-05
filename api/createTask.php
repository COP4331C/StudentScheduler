<?php
	include("config.php");
	include("session.php");

	session_start();

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
	
	$taskname = mysqli_real_escape_string($db,$_POST['taskname']);
      	//$startdate = mysqli_real_escape_string($db,$_POST['startdate']);
      	//$enddate = mysqli_real_escape_string($db,$_POST['enddate']);
      	//$starttime = mysqli_real_escape_string($db,$_POST['starttime']);
      	//$endtime = mysqli_real_escape_string($db,$_POST['endtime']);
	//$mon = mysql_real_escape_string($db, $_POST["mon"]);
	//$tue = mysql_real_escape_string($db, $_POST["tue"]);
	//$wen = mysql_real_escape_string($db, $_POST["wen"]);
	//$thr = mysql_real_escape_string($db, $_POST["thr"]);
	//$fri = mysql_real_escape_string($db, $_POST["fri"]);
	//$sat = mysql_real_escape_string($db, $_POST["sat"]);
	//$sun = mysql_real_escape_string($db, $_POST["sun"]);

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

 





$sql = "insert into events (taskname, startdate, enddate, starttime, endtime, mon, tues, wen, thr, fri, sat, sun, userid) values ('{$taskname}', '{$_POST['startdate']}', '{$_POST['enddate']}', '{$_POST['starttime']}', '{$_POST['endtime']}', '{$mon}', '{$tue}', '{$wen}', '{$thr}', '{$fri}', '{$sat}', '{$sun}', '{$_SESSION['user_id']}')";	

      $result = mysqli_query($db,$sql);

	}

?>


