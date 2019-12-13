function task(id, name, building, tasktime, taskdate, notes)
{
	console.log("hope");

	this.id = id;
	this.name = name;
	this.building = building;
	this.tasktime = tasktime;
	this.taskdate = taskdate;
	this.notes = notes;
}

function addNewTask(name, building, taskdate, tasktime, notes) {
        console.log("uo whjidfjwodj");
        console.log(name);
	console.log(building);
	console.log(taskdate);
	console.log(tasktime);
	console.log(notes);

	var jsonPayload = JSON.stringify({name:name, building:building, taskdate:taskdate, tasktime:tasktime, notes:notes});
	console.log(jsonPayload);

	var url = '/StudentScheduler/api/createTask3.0.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


	try
	{
		xhr.send(jsonPayload);

		
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.hasOwnProperty('error') && jsonObject.error.length > 0)
				{
					// document.getElementById("contactSearchResult").innerHTML = "No contacts were found.";
					console.log("Unexpected error");
					console.log(jsonObject.error);

					document.getElementById("signupError").innerHTML = jsonObject.error;

					return;
				}

				document.getElementById("signupError").innerHTML = "Created successfuly! Logging in...";
				// timedRefresh(2000);

				// Force a login
				doLogin(email, password);

			}
		}
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

  
}

function addNewEvent(taskname, building, starttime, endtime, mon, tue, wen, thr, fri, sat, sun) {
        console.log("uo whjidfjwodj");
        console.log(taskname);
	console.log(building);
	console.log(starttime);
	console.log(endtime);
	console.log(mon);
	console.log(tue);
	console.log(wen);
	console.log(thr);
	console.log(fri);
	console.log(sat);
	console.log(sun);

	var jsonPayload = JSON.stringify({taskname:taskname, building:building, starttime:starttime, endtime, mon, tue, wen, thr, fri, sat, sun});
	console.log(jsonPayload);

	var url = '/StudentScheduler/api/createEvent3.0.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


	try
	{
		xhr.send(jsonPayload);

		
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.hasOwnProperty('error') && jsonObject.error.length > 0)
				{
					// document.getElementById("contactSearchResult").innerHTML = "No contacts were found.";
					console.log("Unexpected error");
					console.log(jsonObject.error);

					document.getElementById("signupError").innerHTML = jsonObject.error;

					return;
				}

				document.getElementById("signupError").innerHTML = "Created successfuly! Logging in...";
				// timedRefresh(2000);

				// Force a login
				doLogin(email, password);

			}
		}
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

  
}


        
function updateEvents(taskname, building, starttime, endtime, mon, tue, wen, thr, fri, sat, sun, id) {
	console.log("uo whjidfjwodj");
        console.log(taskname);
	console.log(building);
	console.log(starttime);
	console.log(endtime);
	console.log(mon);
	console.log(tue);
	console.log(wen);
	console.log(thr);
	console.log(fri);
	console.log(sat);
	console.log(sun);

	
	var jsonPayload = JSON.stringify({taskname:taskname, building:building, starttime:starttime, endtime:endtime, mon:mon, tue:tue, wen:wen, thr:thr, fri:fri, sat:sat, sun:sun});
	console.log(jsonPayload);

	var url = '/StudentScheduler/api/updateEvent2.0.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


	try
	{
		xhr.send(jsonPayload);

		
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.hasOwnProperty('error') && jsonObject.error.length > 0)
				{
					// document.getElementById("contactSearchResult").innerHTML = "No contacts were found.";
					console.log("Unexpected error");
					console.log(jsonObject.error);

					document.getElementById("signupError").innerHTML = jsonObject.error;

					return;
				}

				document.getElementById("signupError").innerHTML = "Created successfuly! Logging in...";
				// timedRefresh(2000);

				// Force a login
				doLogin(email, password);

			}
		}
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
  
}


function deleteEvents(did) {
	console.log(did);

	
	var jsonPayload = JSON.stringify({taskname:did});
	console.log(jsonPayload);

	var url = '/StudentScheduler/api/deleteEvent2.0.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


	xhr.send(jsonPayload);

		

	
  
}


function viewEvents(id) {
	console.log(id);

	
	var jsonPayload = JSON.stringify({taskname:id});
	console.log(jsonPayload);

	var url = '/StudentScheduler/api/vieweventinfo.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


	try
	{
		xhr.send(jsonPayload);
		console.log("dwdwdw");
		
		xhr.onreadystatechange = function()
		{
                        var jsonObject = JSON.parse(xhr.responseText);
			
			console.log(jsonObject);
			document.getElementById("vtaskname").value = jsonObject.taskname;
			document.getElementById("vstarttime").value = jsonObject.starttime;
			document.getElementById("vendtime").value = jsonObject.endtime;
			document.getElementById("vbuilding").value = jsonObject.building;
		}	
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
  
}



/*
function updateEvents(taskname, building, starttime, endtime, mon, tue, wen, thr, fri, sat, sun, courseID) {


	var jsonPayload = JSON.stringify({taskname:taskname, building:building, starttime:starttime, endtime:endtime, mon:mon, tue:tue, wen:wen, thr:thr, fri:fri, sat:sat, sun:sun, id:courseID});
	console.log(jsonPayload);
	console.log(courseID);
	var url = 'StudentScheduler/api/updateEvent2.0.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		// console.log(jsonPlayload);

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);

				if(jsonObject.hasOwnProperty('error') && jsonObject.error.length > 0)
				{
					console.log("Unexpected error");
					console.log(jsonObject.error);
					return;
				}

				else console.log("Event updated successfully");
			}
		}
	}
	catch (err)
	{

	}

}
*/
