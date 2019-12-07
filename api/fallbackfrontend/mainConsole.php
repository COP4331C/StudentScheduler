<?php
   include('session.php');
session_start();
echo($_SESSION['user_id']);
?>
<html>
   
   <head>
      <title>Welcome </title>
   </head>
   
   <body>
      <h1>Welcome <?php echo $login_session; ?></h1> 
      <h2><a href = "logout.php">Sign Out</a></h2>

               <form action = "createTask.php" method = "post">
		  <label>taskname  create:</label><input type = "text" name = "taskname" class = "box"/><br /><br />
		  <label>startdate  :</label><input type = "date" name = "startdate" class = "box" /><br/><br />
		  <label>enddate  create:</label><input type = "date" name = "enddate" class = "box"/><br /><br />
		  <label>starttime  :</label><input type = "time" name = "starttime" class = "box" /><br/><br />
		  <label>endtime  :</label><input type = "time" name = "endtime" class = "box" /><br/><br />
		  <label>monday  :</label><input type = "checkbox" name = "mon" class = "box" value = '1'/><br/><br />
		  <label>tuesday  :</label><input type = "checkbox" name = "tue" class = "box" value = '1'//><br/><br />
		  <label>wenesday  :</label><input type = "checkbox" name = "wen" class = "box" value = '1'//><br/><br />
		  <label>thursday  :</label><input type = "checkbox" name = "thr" class = "box" value = '1'//><br/><br />
		  <label>friday  :</label><input type = "checkbox" name = "fri" class = "box" value = '1'//><br/><br />
		  <label>saturday  :</label><input type = "checkbox" name = "sat" class = "box" value = '1'//><br/><br />
		  <label>sunday  :</label><input type = "checkbox" name = "sun" class = "box" value = '1'//><br/><br />


                  <input type = "submit" value = " Submit "/><br />
	       </form>








               <form action = "deleteTask.php" method = "post">
		  <label>taskname delete :</label><input type = "text" name = "taskname" class = "box"/><br /><br />
                  <input type = "submit" value = " Submit "/><br />
               </form>

               <form action = "viewTask.php" method = "post">
		  <label>taskname  view:</label><input type = "text" name = "taskname" class = "box"/><br /><br />
                  <input type = "submit" value = " Submit "/><br />
               </form>

               <form action = "updateTask.php" method = "post">
		  <label>taskname  update:</label><input type = "text" name = "taskname" class = "box"/><br /><br />
		  <label>startdate  :</label><input type = "date" name = "startdate" class = "box" /><br/><br />
		  <label>enddate  create:</label><input type = "date" name = "enddate" class = "box"/><br /><br />
		  <label>starttime  :</label><input type = "time" name = "starttime" class = "box" /><br/><br />
		  <label>endtime  :</label><input type = "time" name = "endtime" class = "box" /><br/><br />
		  <label>monday  :</label><input type = "checkbox" name = "mon" class = "box" value = '1'/><br/><br />
		  <label>tuesday  :</label><input type = "checkbox" name = "tue" class = "box" value = '1'//><br/><br />
		  <label>wenesday  :</label><input type = "checkbox" name = "wen" class = "box" value = '1'//><br/><br />
		  <label>thursday  :</label><input type = "checkbox" name = "thr" class = "box" value = '1'//><br/><br />
		  <label>friday  :</label><input type = "checkbox" name = "fri" class = "box" value = '1'//><br/><br />
		  <label>saturday  :</label><input type = "checkbox" name = "sat" class = "box" value = '1'//><br/><br />
		  <label>sunday  :</label><input type = "checkbox" name = "sun" class = "box" value = '1'//><br/><br />


                  <input type = "submit" value = " Submit "/><br />
	       </form>

   </body>
   
</html>
