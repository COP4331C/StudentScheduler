var urlBase = 'http://ec2-3-133-147-230.us-east-2.compute.amazonaws.com/StudentScheduler';
var extension = "php";

// Access a user's session cookie to get their user id from the login screen
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
    if (c.indexOf(name) == 0)
		{
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function timedKickOut(redirectTime) {
	setTimeout("location.href = " + urlBase + ";",redirectTime);
}

function fillEvents() {
  var user_id = getCookie("id");

  if (user_id == "")
  {
    console.log("Not signed in!");
    timedKickOut(2000);
    window.location.replace(urlBase);
    alert("You have not signed in! Redirecting to login...");
  }

  var jsonPayload = JSON.stringify({id:user_id});

  var url = urlBase + '/api/getEvents.' + extension;
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.send(jsonPayload);

    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200){
        var jsonObject = JSON.parse(xhr.responseText);

        // error checking here?
        if(jsonObject.length <= 0)
        {
          console.log("No events listed.");

        }

        // Get number of entries in the json array
        var numEvents = jsonObject.length;

        var cardContainer = document.getElementById('eventcard-container');
        var newCard = document.createElement('div');
        newCard.className = 'card mt-3';

        var cardHeader = document.createElement('div');

        newCard.setAttribute('class', "")

        for(int i = 0; i < numEvents; i++) {
          newCard.setAttribute('id', "card" + i);
          newCard.innerHTML
          cardContainer.appendChild(newCard);
        }




      }
    }
  } catch (e) {

  } finally {

  }




}

// Refresh the table of contacts based on the user id saved in the user's cookie
function fetchContactList() {
  try
  {
  	xhr.send(jsonPayload);

    xhr.onreadystatechange = function()
    {
    	if (this.readyState == 4 && this.status == 200)
      {

				else console.log("Contacts found");

				// this should give the number of json entries we were returned?
				var numContacts = jsonObject.length;
				// just the number of cells we need to put into the table per contact
				var numCells = 6;
					// document.getElementById("contactSearchResult").innerHTML = "No contacts were found.";

				// Reference to Bryan's html table to work off of
				var tableRef = document.getElementById('contactTable').getElementsByTagName('tbody')[0];

				for (i = 0; i < numContacts; i++)
				{
					var args = [0];
					args[0] = jsonObject[i].cid;
					args[1] = jsonObject[i].first_name;
					args[2] = jsonObject[i].last_name;
					args[3] = jsonObject[i].address;
					args[4] = jsonObject[i].email;
					args[5] = jsonObject[i].phone;

					// Reference to the current row
					var newRow = tableRef.insertRow(tableRef.rows.length);

					appendRow(args, newRow);
				}
      }
    }
   }
   catch(err)
   {
      document.getElementById("contactSearchResult").innerHTML = err.message;
   }
}

function editClick() {
	var table = document.getElementById("contactTable");
	var contactPopup = document.getElementById("contactForm").children[0].children[0].children[1];
	var selectedCount = 0;
	var selectedRow = null;

	for (var i = 1, row; row = table.rows[i]; i++) {
		if (row.cells[0].children[0].checked == true) {
			selectedCount++;
			selectedRow = row;
		}
	}

	if (selectedCount == 1) {
		clearPopup();
		$("#contactForm").data("editing", true);
		$("#contactForm").data("row", selectedRow);
		$("#contactForm").modal('show');

		for (var i = 0; i < 5; i++)
			contactPopup.children[i].children[1].value = selectedRow.cells[i+1].innerText;
	}
}

function checkAll() {
	var table = document.getElementById("contactTable");

	for (var i = 1, row; row = table.rows[i]; i++)
		row.cells[0].children[0].checked = table.rows[0].cells[0].children[0].checked;
}

// Creates a contact and returns its cid to be used as a reference
function createContact(args, user_id) {
	var jsonPayload = JSON.stringify({id:user_id, first_name:args[1], last_name:args[2], address:args[3], email:args[4], phone:args[5]});
	var url = urlBase + '/LAMPAPI/add_contact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		console.log(jsonPlayload);

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);

				if(jsonObject.hasOwnProperty('cid') && jsonObject.cid <= 0)
				{
					console.log("Unexpected error");
					console.log(jsonObject.error);
					console.log("cid please " + jsonObject.cid);
					return -1;
				}

				console.log("Contact created successfully");
				console.log("cid i guess = " + jsonObject.cid);
				document.location.reload(true);
				return jsonObject.cid;
			}
		}
	}
	catch (err)
	{

	}
}

// Updates a contact using its cid (provided in the args array)
function updateContact(args) {
	var jsonPayload = JSON.stringify({cid:args[0], first_name:args[1], last_name:args[2], address:args[3], email:args[4], phone:args[5]});
	var url = urlBase + '/LAMPAPI/update.' + extension;

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

				else console.log("Contact updated successfully");
			}
		}
	}
	catch (err)
	{

	}

}

function deleteContact(contact_id, user_id) {
	var jsonPayload = JSON.stringify({cid:contact_id, id:user_id});
	var url = urlBase + '/LAMPAPI/delete_contact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		console.log(jsonPlayload);

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

				console.log("Contact successfully deleted");
			}
		}
	}
	catch (err)
	{

	}

}

function deleteClick() {
	var rows = [];
	var table = document.getElementById("contactTable");
	var found = true;
	var foundCount = 0;
	var msg = "Are you sure you want to delete ";

	for (var i = 1, row; row = table.rows[i]; i++) {
		if (row.cells[0].children[0].checked == true)
		{
			deleteContact(row.id, getCookie("id"))
			foundCount++;
		}

	}

	console.log(foundCount);
	if (foundCount == 1)
		msg = msg.concat("this contact?");
	else if (foundCount > 0)
		msg = msg.concat("these ").concat(foundCount).concat(" contacts?");

	if (foundCount > 0) {
		if (confirm(msg)) {
			while (found) {
				found = false;

				for (var i = 1, row; row = table.rows[i]; i++) {
					if (row.cells[0].children[0].checked == true) {
						found = true;
						table.deleteRow(row.rowIndex);
						break;
					}
				}
			}
		}
	}
}

function clearPopup() {
	var contactModal, contactPopup;

	contactModal = document.getElementById("contactForm");
	if (contactModal) {
		contactPopup = document.getElementById("contactForm").children[0].children[0].children[1];

		for (var i = 0; i < 5; i++)
			contactPopup.children[i].children[1].value = "";
	}

	$("#contactForm").data("editing", false);
}

function filterTable() {
	var search = document.getElementById("searchBox");
	var table = document.getElementById("contactTable");
	var txt;

	for (var i = 1, row; row = table.rows[i]; i++) {
		for (var j = 1, col; col = row.cells[j]; j++) {
			if (col.textContent.toUpperCase().includes(search.value.toUpperCase())) {
				row.style.display = "";
				break;
			}
			else
				row.style.display = "none";
		}
	}
}

// Appends each of the 6 required cells in a row.
function appendRow(args, newRow) {
	// Reference to the current row
	newRow.id = args[0]

	var numCells = 6;

	for (j = 0; j < numCells; j++)
	{
		// Reference to the current cell
		var newCell = newRow.insertCell(j);

		// Create the checkbox that will be added in the first cell of each row
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "name";
		checkbox.value = "value";
		checkbox.id = "id";
		checkbox.align = "center";

		// String to store the text we're adding to this cell
		var cellString;

		// Detect which attribute we need to add
		switch(j)
		{
			// If this is cell 0, append a checkbox and skip to next iteration
			case 0:
				newCell.appendChild(checkbox);
				newCell.align = "center";
				continue;
			case 1:
				cellString = args[1];
				break;
			case 2:
				cellString = args[2];
				break;
			case 3:
				cellString = args[3];
				break;
			case 4:
				cellString = args[4];
				break;
			case 5:
				cellString = args[5];
				break;
			default:
				break;
		}

		// Not sure if we'll get nulls but just in case
		if (cellString == null)
			cellString = "";

		// Make a new text node out of cellString
		var newText = document.createTextNode(cellString);

		// Add newText to the current cell
		newCell.appendChild(newText);

	}
}

function saveClick() {
	var table = document.getElementById("contactTable");
	var row = $("#contactForm").data("row");
	var args, cid, blank;
	var contactPopup = document.getElementById("contactForm").children[0].children[0].children[1];
	var newRowString = "";

	// Check if the user just left fields blank
	blank = true;
	for (var i = 0; i < 5; i++) {
		if (contactPopup.children[i].children[1].value.length > 0) {
			blank = false;
			break;
		}
	}

	// If the fields are blank, ignore the button press.
	if (!blank)
	{
		// Are we editing an existing contact?
		if ($("#contactForm").data("editing"))
		{

			// Grab the row id (which = the contact id)
			args = [row.id];

			// Push each cell from the table into args
			for (var i = 0; i < 5; i++) {
				row.cells[i+1].innerText = contactPopup.children[i].children[1].value;
				args.push(contactPopup.children[i].children[1].value);
			}

			// Push the update to the server
			updateContact(args);
		}

		// Otherwise, we must be creating a new contact
		else
		{
			// Initialize args with cid = 0
			args = [0];

			// Push each cell from the table into args
			for (var i = 0; i < 5; i++)
				args.push(contactPopup.children[i].children[1].value);

			// Print args for my sake temporarily
			console.log(args);

			// Make a new contact in the database, capture cid.
			args[0] = createContact(args, getCookie("id"));

			console.log(args[0]);

			// Removed cid check because it just kept not working!!!!!!!!
			// If our cid was valid, go ahead and add this new row to the frontend
			// if (args[0] > 0)


			// Create a tableRef here (required to allow modularization of fetchContacts)
			var tableRef = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
			var newRow = tableRef.insertRow(tableRef.rows.length);
			appendRow(args, newRow);

			// intialize({});

			//
			// else
			// 	console.log("guess newContact() failed damn thats crazy...good luck with that");
		}

		$("#contactForm").modal('hide');
	}
}

function signOut() {
	// Clear cookies by forcing expiration
	document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

	// Redirect to login page
	window.location.replace(urlBase);

}
