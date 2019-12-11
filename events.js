var urlBase = 'http://ec2-3-133-147-230.us-east-2.compute.amazonaws.com/StudentScheduler';
var extension = "php";

// Read in the value of a cookie with given name cname
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

// event object constructor
function event(){
  this.id = args[0];
  this.eventName = args[1];
  this.building = args[2];
  this.startDate = args[3];
  this.endDate = args[4];
  this.pattern = args[5];
  this.startTime = args[6];
  this.endTime = args[7];
}

function dayParse(eventArray, index){
  var dayArray[];

  if(eventArray[index].mon) == 1)
    dayArray.push("M");
  if(eventArray[index].tues == 1)
    dayArray.push("Tu");
  if(eventArray[index].wen == 1)
    dayArray.push("W");
  if(eventArray[index].thr == 1)
    dayArray.push("Tr");
  if(eventArray[index].fri == 1)
    dayArray.push("F");

  return dayArray;
}

function getAllEvents(){
  var events[];

  var userId = getCookie("id");
  if (user_id == "")
  {
    console.log("Not signed in!");
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

        // error checking?
        if(jsonObject.length <= 0)
        {
          console.log("No events found");
          return;
        }

        var numEvents = jsonObject.length;
        var args[];

        for (int i = 0; i < numEvents; i++){
          args[0] = jsonObject[i].id;
          args[1] = jsonObject[i].taskname;
          args[2] = jsonObject[i].building;
          args[3] = jsonObject[i].startdate;
          args[4] = jsonObject[i].enddate;
          args[5] = dayParse(jsonObject, i);
          args[6] = jsonObject[i].starttime;
          args[7] = jsonObject[i].endtime;
          events.push(new event(args));
        }
      }
    }
  }
}

function createEvent(args, user_id) {
    var jsonPayload = JSON.stringify({taskname:args[1], startdate:args[2], enddate:args[3], starttime:args[4], endtime:args[5], mon:args[6], tues:args[7], wen:args[8], thr:args[9], fri:args[10], sat:args[11], sun:args[12], userid:user_id, building:args[13]});

// {taskname:args[1], startdate:args[2], enddate:args[3], starttime:args[4], endtime:args[5], mon:args[6], tues:args[7], wen:args[8], thr:args[9], fri:args[10], sat:args[11], sun:args[12], userid:user_id, building:args[13]}

    var url = urlBase + '/api/createEvent3.0.' + extension;

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

function signOut() {
	// Clear cookies by forcing expiration
	document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

	// Redirect to login page
	window.location.replace(urlBase);

}
