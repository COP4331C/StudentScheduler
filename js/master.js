// 							GLOBAL VARIABLES
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var week1html, week2html, week3html;
var shownWeek, nextWeek, lastWeek;
var carouselPosition = "#week2slide";


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
function task(id, details, notes, startDate, endDate, dayOfWeek, startTime, endTime, location, course, taskType) {
	var startSplit = startTime.split(":");
	var endSplit = endTime.split(":");
	var startSplitInt = []
	var endSplitInt = [];
	var i;
	
	this.startTime = convertTime(startTime);
	this.endTime = convertTime(endTime);
	this.id = id;
	this.details = details;
	this.notes = notes;
	this.startDate = startDate;
	this.endDate = endDate;
	this.dayOfWeek = dayOfWeek;
	this.location = location;
	this.course = course;
	this.taskType = taskType;
	this.startMinute = startSplit[0] * 60 + startSplit[1];
	this.endMinute = endSplit[0] * 60 + endSplit[1];
}

// class object constructor
function course(id, courseName, mon, tue, wed, thu, fri, startTime, endTime, location) {
	var meetString = "";
	var locationSplit = [];
	
	this.id = id;
	this.courseName = courseName;
	
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
	
	this.meetPattern = meetString;
	this.startTime = convertTime(startTime);
	this.endTime = convertTime(endTime);
	
	locationSplit = location.split(" ");
	
	this.mapsLocation = locationSplit[0] + " " + locationSplit[1];
	this.building = locationSplit[1];
	this.room = locationSplit[2];
}


// 							DB PUSH FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function addNewTask(task) {

}

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

	
// 								HTML EVENTS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// rebuild neighboring week when carousel slides
	$('#weeklyCarousel').on('slid.bs.carousel', carouselSlid);
		
});
