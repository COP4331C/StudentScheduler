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

	var jsonPayload = JSON.stringify({name:name, building:building, taskdate:taskdate, tasktime:tasktime, notes:notes, userid: "5"});
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

