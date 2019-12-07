var urlBase = 'http://ec2-3-133-147-230.us-east-2.compute.amazonaws.com/StudentScheduler';
var extension = "php";

$(function() {

    $('#loginSubmit').click(function(e){
		$('#registerSubmit').removeClass('active');
		$(this).addClass('active');
		doLogin();
		e.preventDefault();
	});
	$('#registerSubmit').click(function(e)
	{
		console.log("submit clicked");
		$('#loginSubmit').removeClass('active');
		$(this).addClass('active');
		doCreateAccount();
		e.preventDefault();
	});

});

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

function doCreateAccount()
{
	userId = 0;
	document.getElementById("signupError").innerHTML = "";


	var username = document.getElementById("signupUsername").value;
	var password = document.getElementById("signupPW").value;
	var confirmPass = document.getElementById("confirmPW").value;

	if (username == "")
	{
		document.getElementById("signupError").innerHTML = "Enter an username address";
		return;
	}

	if (password != confirmPass)
	{
		document.getElementById("signupError").innerHTML = "Passwords do not match";
		console.log("Passwords do not match");
		return;
	}

	var jsonPayload = JSON.stringify({username:username, password:password});
	var url = urlBase + '/api/createAccount.' + extension;

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
				doLogin(username, password);

			}
		}
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}


function doLogin(creationUsername, creationPass) {
	document.getElementById("loginError").innerHTML = "";

  var username = creationUsername;
  var pass = creationPass;

  if (username == null || pass == null)
  {
    username = document.getElementById("loginUsername").value;
    pass = document.getElementById("loginPW").value;
  }

  console.log("Username: " + username + ", Password: " + pass);

	// Glue together some json
	var jsonPayload = JSON.stringify({username:username, password:pass});
	var url = urlBase + '/api/login2.0.' + extension;

	// Prepare to send
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

// 	var url = urlBase + '/contacts.html';
	try
	{
		// Send the payload
		xhr.send(jsonPayload);

		console.log(jsonPayload);

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Parse the response from the server
				var jsonObject = JSON.parse(xhr.responseText);

				// Get UID from json. If json does not have an updated UID, print error.
				var userId = jsonObject.id;
				if (userId < 1)
				{
					document.getElementById("loginError").innerHTML = "Username/Password combination invalid";
					console.log("User doesn't exist");
					return;
				}

				// Otherwise, we successfuly got a user from the database.
				document.getElementById("loginError").innerHTML = "Success";

				// Save id into a sitewide cookie
				createCookie("id", userId.toString());

				// Save the username for "signed in as:" display
				// createCookie("username", username);

				// var tempstring = getCookie("user_id");

				// Reset the username and password just for cleanliness
				document.getElementById("loginUsername").value = "";
				document.getElementById("loginPW").value = "";

				// Go to contacts.html
				console.log("Redirecting...");
				window.location.replace(urlBase + "/landing.html");

			}
		}
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow("createDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow("welcomeDiv", true);
}

// Creates a cookie to store a user's session info
function createCookie(name, value)
{
	document.cookie = name + "=" + value + ";path=/";
}

function getCookie(cname)
{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    return c.substring(name.length, c.length);

  }
  return "";
}



function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}
