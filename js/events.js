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

// card object constructor
function eventCard(id, eventName, startDate, endDate, pattern, startTime, endTime, building){
  this.id = id;
  this.eventName = eventName;
  this.startDate = startDate;
  this.pattern = pattern;
  this.startTime = startTime;
  this.endTime = endTime;
  this.building = building;
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
        
      }
    }
  }

}
