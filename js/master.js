// 							GLOBAL VARIABLES
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var week1html, week2html, week3html;
var shownWeek, nextWeek, lastWeek;
var carouselPosition = "#week2slide";
var todaysDate, tomorrowsDate;

// 							BASIC UTILITY FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// return string of date in mm/dd format
function formatDate1(someDate) {
	var month = someDate.getMonth() + 1;
	var day = someDate.getDate();
	
	return month + "/" + day;
}

// return string of date in database format
function formatDate2(someDate) {
	var year = someDate.getYear() + 1900;
	var month = someDate.getMonth() + 1;
	var day = someDate.getDate();
	
	return year + "-" + month + "-" + day;
}

// database time format to user-friendly time format
function convertTime(dbTime) {
	var timeString;
	var timeSplit = dbTime.split(":");
	var timeSplitInt = [];
	var i;
	
	for (i = 0; i < timeSplit.length; i++)
		timeSplitInt[i] = parseInt(timeSplit[i]);
	
	if (timeSplitInt[0] == 0)
		timeString = "12:" + timeSplit[1] + "a";
	else if (timeSplitInt[0] > 12)
		timeString = (timeSplitInt[0] - 12) + ":" + timeSplit[1] + "p";
	else
		timeString = timeSplitInt[0] + ":" + timeSplit[1] + "a";
	
	return timeString;
}


// 							DB OBJECT CONSTRUCTORS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// task object constructor
function task(id, name, building, tasktime, taskdate, notes) {
	console.log("idk");
	this.id = id;
	this.name = name;
	this.building = building;
	this.tasktime = tasktime;
	this.taskdate = taskdate;
	this.notes = notes;
	/*
	var startSplit = startTime.split(":");
	var endSplit = endTime.split(":");
	var startSplitInt = []
	var endSplitInt = [];
	var i;
	
	// general properties
	this.startTimeDB = startTime;
	this.endTimeDB = endTime;
	this.id = id;
	this.details = details;
	this.notes = notes;
	this.startDate = startDate;
	this.endDate = endDate;
	this.dayOfWeek = dayOfWeek;
	this.location = location;
	this.course = course;
	this.taskType = taskType;
	
	// frontend-specific properties
	this.startTime = convertTime(startTime);
	this.endTime = convertTime(endTime);
	this.startMinute = startSplit[0] * 60 + startSplit[1];
	this.endMinute = endSplit[0] * 60 + endSplit[1];

	*/
}

// class object constructor
function course(id, courseName, mon, tue, wed, thu, fri, startTime, endTime, location) {
	var meetString = "";
	var locationSplit = [];
	var startTimeSplit = [];
	var endTimeSplit = [];
	
	// general properties
	this.id = id;
	this.courseName = courseName;
	this.startTimeDB = startTime;
	this.endTimeDB = endTime;
	this.location = location;
	this.mon = mon;
	this.tue = tue;
	this.wed = wed;
	this.thu = thu;
	this.fri = fri;
	
	// frontend-specific properties
	if (mon)
		meetString = meetString + "M ";
	if (tue)
		meetString = meetString + "Tu ";
	if (wed)
		meetString = meetString + "W ";
	if (thu)
		meetString = meetString + "Th ";
	if (fri)
		meetString = meetString + "F ";
	
	meetString = meetString.substring(0, meetString.length - 1);
	this.meetPattern = meetString;
	this.startTime = convertTime(startTime);
	this.endTime = convertTime(endTime);
	
	startTimeSplit = startTime.split(":");
	endTimeSplit = endTime.split(":");
	this.meetLength = (parseInt(endTimeSplit[0]) * 60 + parseInt(endTimeSplit[1])) - (parseInt(startTimeSplit[0]) * 60 + parseInt(endTimeSplit[1]));
	
	locationSplit = location.split(" ");
	
	this.mapsLocation = locationSplit[0] + " " + locationSplit[1];
	this.building = locationSplit[1];
	this.room = locationSplit[2];
}


// 							DB PUSH FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
function addNewTask(task) {
	console.log("uo whjidfjwodj");
	//console.log(task.name);
	var jsonPayload = JSON.stringify({name:task.name}, )
	
}
*/
function addNewCourse(course) {	

}


// 							DB FETCH FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getTasksForWeek(someWeek) {
	var tasks = [];

	// get tasks for week starting @date from database and add all to "tasks" array
	
	return tasks;
}

function getCourses() {
	var courses = [];
	
	// populate "courses" array with "course" objects representing the classes in the database

	return courses;
}

function getItemsForHome(someDay) {
    var items = [];

    // populate "items" array with tasks  and classes occuring on "someDay"

    return items;
}

function getCourseById(id) {
	var singleCourse;
	
	// retrieve the single course with matching ID
	singleCourse = new course();
	
	return singleCourse;
}

function getTaskById(id) {
	var singleTask;
	
	// retrieve the single task with matching ID
	singleTask = new task();
	
	return singleTask;
}


// 							CLASSES TAB HTML CONTROL
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function buildCourseHTML() {
	var courses = getCourses();
	
	$('#courseCards').empty();
	
	courses.forEach(function(course) {
		$('#courseCards').append(`
			<div class="card mt-3" id="course` + course.id + `">
				<div class="card-header">
					<div class="d-flex align-items-center">
						<span class="font-weight-bold mr-auto" style="font-size:16px;">` + course.courseName + `</span>
						<button class="btn float-right" id="editCourse` + course.id + `" style="background-color:transparent;" data-toggle="modal" data-target="#classForm">
							<i class="fa fa-pen"></i>
						</button>
					</div>
				</div>
				<div class="container mt-2 mb-2">
					<div class="row">
						<div class="col text-right">Pattern: </div>
						<div class="col-8" name="1">` + course.meetPattern + `</div>
					</div>
					<div class="row">
						<div class="col text-right">Time: </div>
						<div class="col-8">` + course.startTime + ` - ` + course.endTime + `</div>
					</div>
					<div class="row">
						<div class="col text-right">Location: </div>
						<div class="col-8">` + course.building + ' ' + course.room + `</div>
					</div>
				</div>
			</div>
		`);
	});
}


// 							TO DO TAB HTML CONTROL
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// update carousel when moved
function carouselSlid(e) {
	if (e.direction == "right") {
		nextWeek.setDate(nextWeek.getDate() - 7);
		shownWeek.setDate(shownWeek.getDate() - 7);
		lastWeek.setDate(lastWeek.getDate() - 7);
		
		console.log(lastWeek);
		console.log(shownWeek);
		console.log(nextWeek);
		
		switch(carouselPosition) {
			case "#week1slide":
				carouselPosition = "#week3slide";
				buildWeekHTML(lastWeek, "#week2slide");
				break;
			case "#week2slide":
				carouselPosition = "#week1slide";
				buildWeekHTML(lastWeek, "#week3slide");
				break;
			case "#week3slide":
				carouselPosition = "#week2slide";
				buildWeekHTML(lastWeek, "#week1slide");
				break;
		}
	}
	else {
		nextWeek.setDate(nextWeek.getDate() + 7);
		shownWeek.setDate(shownWeek.getDate() + 7);
		lastWeek.setDate(lastWeek.getDate() + 7);
		
		console.log(lastWeek);
		console.log(shownWeek);
		console.log(nextWeek);
		
		switch(carouselPosition) {
			case "#week1slide":
				carouselPosition = "#week2slide";
				buildWeekHTML(nextWeek, "#week3slide");
				break;
			case "#week2slide":
				carouselPosition = "#week3slide";
				buildWeekHTML(nextWeek, "#week1slide");
				break;
			case "#week3slide":
				carouselPosition = "#week1slide";
				buildWeekHTML(nextWeek, "#week2slide");
				break;
		}
	}
	
	$("#shownWeekHeader").text("WEEK OF " + formatDate1(shownWeek));
}
		
		
function buildWeekHTML(someWeek, targetElement) {
	var weekTasks;
	var monTasks = [];
	var tueTasks = [];
	var wedTasks = [];
	var thuTasks = [];
	var friTasks = [];
	var satTasks = [];
	var sunTasks = [];
	
	weekTasks = getTasksForWeek(formatDate2(someWeek));

	// sort weekly tasks into daily buckets
	weekTasks.forEach(function(task) {
		switch(task.dayOfWeek) {
			case 0:
				monTasks.push(task);
				break;
			case 1:
				tueTasks.push(task);
				break;
			case 2:
				wedTasks.push(task);
				break;
			case 3:
				thuTasks.push(task);
				break;
			case 4:
				friTasks.push(task);
				break;
			case 5:
				satTasks.push(task);
				break;
			case 6:
				sunTasks.push(task);
				break;
		}
	});
	
	// sort each task in each bucket by start time
	monTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	tueTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	wedTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	thuTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	friTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	satTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	sunTasks.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	
	// clear old HTML
	$(targetElement).empty();
	
	// Monday
	$(targetElement).append('<div class="mt-2">M O N D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="mondayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	monTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	// Tuesday
	$(targetElement).append('<div class="mt-4">T U E S D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="tuesdayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	tueTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	// Wednesday
	$(targetElement).append('<div class="mt-4">W E D N E S D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="wednesdayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	wedTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	// Thursday
	$(targetElement).append('<div class="mt-4">T H U R S D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="thursdayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	thuTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	// Friday
	$(targetElement).append('<div class="mt-4">F R I D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="fridayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	friTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	// Saturday
	$(targetElement).append('<div class="mt-4">S A T U R D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="saturdayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	satTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	// Sunday
	$(targetElement).append('<div class="mt-4">S U N D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="sundayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	sunTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 left-half-round d-flex time-` + task.taskType + `">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border right-half-round">
					<button id="task"` + task.id + ` class="btn w-100 text-left taskbutton">` + task.details + `</button>
				</div>
			</div>
		`);
	});
	
	if (monTasks.length > 0)
		$(targetElement).find('[name ="mondayNothing"]').addClass("d-none");
	if (tueTasks.length > 0)
		$(targetElement).find('[name ="tuesdayNothing"]').addClass("d-none");
	if (wedTasks.length > 0)
		$(targetElement).find('[name ="wednesdayNothing"]').addClass("d-none");
	if (thuTasks.length > 0)
		$(targetElement).find('[name ="thursdayNothing"]').addClass("d-none");
	if (friTasks.length > 0)
		$(targetElement).find('[name ="fridayNothing"]').addClass("d-none");
	if (satTasks.length > 0)
		$(targetElement).find('[name ="saturdayNothing"]').addClass("d-none");
	if (sunTasks.length > 0)
		$(targetElement).find('[name ="sundayNothing"]').addClass("d-none");
}


// 								WEBPAGE ONLOAD
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function() {
    // get first day of current week
    todaysDate = new Date();
    tomorrowsDate = new Date(todaysDate.getTime());
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    shownWeek = new Date();
    shownWeek.setDate(shownWeek.getDate() - ((shownWeek.getDay() == 0) ? 6 : shownWeek.getDay() - 1));
    lastWeek = new Date(shownWeek.getTime());
    nextWeek = new Date(shownWeek.getTime());
    lastWeek.setDate(lastWeek.getDate() - 7);
    nextWeek.setDate(nextWeek.getDate() + 7);

    buildCourseHTML();

    // set up initial carousel weeks
    buildWeekHTML(shownWeek, "#week2slide");
    buildWeekHTML(lastWeek, "#week1slide");
    buildWeekHTML(nextWeek, "#week3slide");
    $("#shownWeekHeader").text("WEEK OF " + formatDate1(shownWeek));


//                                                                                         HTML EVENTS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // rebuild neighboring week when carousel slides
    $('#weeklyCarousel').on('slid.bs.carousel', carouselSlid);

});

	
// 								HTML EVENTS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// rebuild neighboring week when carousel slides
	$('#weeklyCarousel').on('slid.bs.carousel', carouselSlid);
		
});

function editClassClick(sender) {
	var editingCourse = 
	var patternDropdown = $('#meetPattern');
	var meetTimeDropdown = $('#meetTime');
	var meetLengthDropdown = $('#meetLength');
	var buildingDropdown = $('#building');
	
	$('#classForm').data("editing") = true;
	$('#courseTitle').value = editingCourse.courseName;
	$('#room').value = editingCourse.room;
	
	for (var i = 0; i < patternDropdown.options.length; i++) {
		if (patternDropdown.options[i].text == editingCourse.meetPattern) {
			patternDropdown.selectedIndex = i;
			break;
		}
	}
	
	for (var i = 0; i < meetTimeDropdown.options.length; i++) {
		if (meetTimeDropdown.options[i].text == editingCourse.startTime) {
			meetTimeDropdown.selectedIndex = i;
			break;
		}
	}
	
	if (editingCourse.meetLength == 50)
		meetLengthDropdown.selectedIndex = 0;
	else if (editingCourse.meetLength == 75)
		meetLengthDropdown.selectedIndex = 1;
	else if (editingCourse.meetLength == 110)
		meetLengthDropdown.selectedIndex = 2;
	else if (editingCourse.meetLength == 170)
		meetLengthDropdown.selectedIndex = 3;
	
	for (var i = 0; i < buildingDropdown.options.length; i++) {
		if (buildingDropdown.options[i].text == editingCourse.building) {
			buildingDropdown.selectedIndex = i;
			break;
		}
	}
}
/*

// ------------------------------------------------------------------- chika
function buildHomeHTML(items) {
	var todayItems = [];
	var tomorrowItems = [];
	
	todayItems = getItemsForHome(formatDate2(todaysDate));
	tomorrowItems = getItemsForHome(formatDate2(tomorrowsDate));
	
	todayItems.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	tomorrowItems.sort((a, b) => (a.startMinute > b.startMinute) ? 1 : -1);
	
	$('#homepage').append('<h4 class="mt-3"><u>T O D A Y</u></h4>');
	
	todayItems.forEach(function(item) {
		$('#homepage').append('<div class="font-weight-bold text-center" style="font-size:16px;">' + item.startTime + '</div>');
		if (item.toString == "event") {
			$('#homepage').append(`
				<div class="card mb-3 text-center" id="homeevent` + item.id + `">
					<div class="card-header">
						<a data-toggle="collapse" data-target="#map1collapse" style="font-size:14px;">
							<i class="fa fa-angle-down float-right"></i>
							Computer Communication Networks
						</a>
					</div>
					<div id="eventreminder1">No reminders</div>
					<div id="map1collapse" class="collapse show">
						<div class="card-body" style="padding-top:0; padding-left:5px; padding-right:5px">
							<div class="tab-pane container-fluid" style="padding-left:0;padding-right:0" id="event1maps">
								<ul class="nav nav-tabs nav-justified">
									<li class="nav-item">
										<a class="nav-link active" data-toggle="tab" href="#eventwalk1">
											<div><i class="fa fa-walking"></i></div>
											<div style="font-size:12px">1h 38m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbike1">
											<div><i class="fa fa-bicycle"></i></div>
											<div style="font-size:12px">25m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventcar1">
											<div><i class="fa fa-car"></i></div>
											<div style="font-size:12px">9m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbus1">
											<div><i class="fa fa-bus"></i></div>
											<div style="font-size:12px">-</div>
										</a>
									</li>
								</ul>
								<div class="tab-content">
									<div id="eventwalk` + item.id + `" class="tab-pane container active">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d28031.544417952166!2d-81.22985002940365!3d28.57147272627009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749808082!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>				
									<div id="eventbike` + item.id + `" class="tab-pane container">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d56061.54538564143!2d-81.2473803470514!3d28.57436915472536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e1!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749587312!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>
									<div id="eventcar` + item.id + `" class="tab-pane container">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d28031.5408744606!2d-81.22531407940366!3d28.571486026269753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749727669!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>
									<div id="eventbus` + item.id + `" class="tab-pane container">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d112126.18146221379!2d-81.27764254925123!3d28.571469169580343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749517026!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>
			`);
		}
		
		else {
			$('#homepage').append(`
				<div class="card mb-3 text-center" id="hometask` + item.id + `">
					<div class="card-header">
						<a data-toggle="collapse" data-target="#map1collapse" style="font-size:14px;">
							<i class="fa fa-angle-down float-right"></i>
							Computer Communication Networks
						</a>
					</div>
					<div id="eventreminder1">No reminders</div>
					<div id="map1collapse" class="collapse show">
						<div class="card-body" style="padding-top:0; padding-left:5px; padding-right:5px">
							<div class="tab-pane container-fluid" style="padding-left:0;padding-right:0" id="event1maps">
								<ul class="nav nav-tabs nav-justified">
									<li class="nav-item">
										<a class="nav-link active" data-toggle="tab" href="#eventwalk1">
											<div><i class="fa fa-walking"></i></div>
											<div style="font-size:12px">1h 38m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbike1">
											<div><i class="fa fa-bicycle"></i></div>
											<div style="font-size:12px">25m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventcar1">
											<div><i class="fa fa-car"></i></div>
											<div style="font-size:12px">9m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbus1">
											<div><i class="fa fa-bus"></i></div>
											<div style="font-size:12px">-</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			`);
		}
	}
	
	$('#homepage').append('<h4 class="mt-3"><u>T O M O R R O W</u></h4>');
	
	tomorrowItems.forEach(function(item) {
		$('#homepage').append('<div class="font-weight-bold text-center" style="font-size:16px;">' + item.startTime + '</div>');
		if (item.toString == "event") {
			$('#homepage').append(`
				<div class="card mb-3 text-center" id="homeevent` + item.id + `">
					<div class="card-header">
						<a data-toggle="collapse" data-target="#map1collapse" style="font-size:14px;">
							<i class="fa fa-angle-down float-right"></i>
							Computer Communication Networks
						</a>
					</div>
					<div id="eventreminder1">No reminders</div>
					<div id="map1collapse" class="collapse show">
						<div class="card-body" style="padding-top:0; padding-left:5px; padding-right:5px">
							<div class="tab-pane container-fluid" style="padding-left:0;padding-right:0" id="event1maps">
								<ul class="nav nav-tabs nav-justified">
									<li class="nav-item">
										<a class="nav-link active" data-toggle="tab" href="#eventwalk1">
											<div><i class="fa fa-walking"></i></div>
											<div style="font-size:12px">1h 38m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbike1">
											<div><i class="fa fa-bicycle"></i></div>
											<div style="font-size:12px">25m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventcar1">
											<div><i class="fa fa-car"></i></div>
											<div style="font-size:12px">9m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbus1">
											<div><i class="fa fa-bus"></i></div>
											<div style="font-size:12px">-</div>
										</a>
									</li>
								</ul>
								<div class="tab-content">
									<div id="eventwalk1" class="tab-pane container active">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d28031.544417952166!2d-81.22985002940365!3d28.57147272627009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749808082!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>				
									<div id="eventbike1" class="tab-pane container">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d56061.54538564143!2d-81.2473803470514!3d28.57436915472536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e1!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749587312!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>
									<div id="eventcar1" class="tab-pane container">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d28031.5408744606!2d-81.22531407940366!3d28.571486026269753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749727669!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>
									<div id="eventbus1" class="tab-pane container">
										<div class="map-responsive">
											<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d112126.18146221379!2d-81.27764254925123!3d28.571469169580343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x88e766502df12e2b%3A0x73b74c97de0b04af!2sLockheed%20Martin%2C%20100%20Global%20Innovation%20Cir%2C%20Orlando%2C%20FL%2032825-5003%2C%20USA!3m2!1d28.5405469!2d-81.2151457!4m5!1s0x88e7685d6a0a495f%3A0x5fd59b92b3c79bab!2sUniversity%20of%20Central%20Florida%2C%204000%20Central%20Florida%20Blvd%2C%20Orlando%2C%20FL%2032816!3m2!1d28.6024274!2d-81.2000599!5e0!3m2!1sen!2sus!4v1575749517026!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
										</div>
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>
			`);
		}
		
		else {
			$('#homepage').append(`
				<div class="card mb-3 text-center" id="hometask` + item.id + `">
					<div class="card-header">
						<a data-toggle="collapse" data-target="#map1collapse" style="font-size:14px;">
							<i class="fa fa-angle-down float-right"></i>
							Computer Communication Networks
						</a>
					</div>
					<div id="eventreminder1">No reminders</div>
					<div id="map1collapse" class="collapse show">
						<div class="card-body" style="padding-top:0; padding-left:5px; padding-right:5px">
							<div class="tab-pane container-fluid" style="padding-left:0;padding-right:0" id="event1maps">
								<ul class="nav nav-tabs nav-justified">
									<li class="nav-item">
										<a class="nav-link active" data-toggle="tab" href="#eventwalk1">
											<div><i class="fa fa-walking"></i></div>
											<div style="font-size:12px">1h 38m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbike1">
											<div><i class="fa fa-bicycle"></i></div>
											<div style="font-size:12px">25m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventcar1">
											<div><i class="fa fa-car"></i></div>
											<div style="font-size:12px">9m</div>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#eventbus1">
											<div><i class="fa fa-bus"></i></div>
											<div style="font-size:12px">-</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			`);
		}
	}
}
*/
