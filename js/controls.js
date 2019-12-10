/*
var months = ["J A N U A R Y", "F E B R U A R Y", "M A R C H", "A P R I L", "M A Y", "J U N E", "J U L Y", "A U G U S T", "S E P T E M B E R", "O C T O B E R", "N O V E M B E R", "D E C E M B E R"];
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var shownDate = new Date();
var shownMonth = shownDate.getMonth();
var lastDate = shownDate.setMonth(shownDate.getMonth()-1));
var nextDate = shownDate.setMonth(shownDate.getMonth()+1))
var lastMonthPane = "month1";
var currentMonthPane = "month2";
var nextMonthPane = "month3";
*/

var week1html, week2html, week3html;
var shownWeek, nextWeek, lastWeek;
var carouselPosition = "#week2slide";

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

// task object constructor
function task(id, details, notes, startDate, endDate, dayOfWeek, startTime, endTime, location, course) {
	var startSplit = startTime.split(":");
	var endSplit = endTime.split(":");
	var startSplitInt = []
	var endSplitInt = [];
	var i;
	
	for (i = 0; i < startSplit.length; i++)
		startSplitInt[i] = parseInt(startSplit[i]);
	
	for (i = 0; i < endSplit.length; i++)
		endSplitInt[i] = parseInt(endSplit[i]);
	
	if (startSplitInt[0] == 0)
		this.startTime = "12:" + startSplit[1] + "a";
	else if (startSplitInt[0] > 12)
		this.startTime = (startSplitInt[0] - 12) + ":" + startSplit[1] + "p";
	else
		this.startTime = startSplitInt[0] + ":" + startSplit[1] + "a";
	
	if (endSplitInt[0] == 0)
		this.endTime = "12:" + endSplit[1] + "a";
	else if (endSplitInt[0] > 12)
		this.endTime = (endSplitInt[0] - 12) + ":" + endSplit[1] + "p";
	else
		this.endTime = endSplitInt[0] + ":" + endSplit[1] + "a";
	
	this.id = id;
	this.details = details;
	this.notes = notes;
	this.startDate = startDate;
	this.endDate = endDate;
	this.dayOfWeek = dayOfWeek;
	this.location = location;
	this.course = course;
	this.startMinute = startSplit[0] * 60 + startSplit[1];
	this.endMinute = endSplit[0] * 60 + endSplit[1];
}

function getTasksForWeek(someWeek) {
	var tasks = [];

	if (someWeek == "2019-12-9") {
		tasks.push(new task(1, "test task Monday 12/9", "", "", "", 0, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Monday 12/9", "", "", "", 0, "13:30:23", "13:50:00", "", ""));
		tasks.push(new task(1, "test task Tuesday 12/10", "", "", "", 1, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Wednesday 12/11", "", "", "", 2, "13:30:23", "13:50:00", "", ""));
		tasks.push(new task(1, "test task Thursday 12/12", "", "", "", 3, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Friday 12/13", "", "", "", 4, "13:30:23", "13:50:00", "", ""));
	}
	if (someWeek == "2019-12-2") {
		tasks.push(new task(1, "test task Tuesday 12/3", "", "", "", 1, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Wednesday 12/4", "", "", "", 2, "13:30:23", "13:50:00", "", ""));
		tasks.push(new task(1, "test task Thursday 12/5", "", "", "", 3, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Friday 12/6", "", "", "", 4, "13:30:23", "13:50:00", "", ""));
		tasks.push(new task(1, "test task Saturday 12/7", "", "", "", 5, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Sunday 12/8", "", "", "", 6, "13:30:23", "13:50:00", "", ""));
	}
	if (someWeek == "2019-12-16") {
		tasks.push(new task(1, "test task Monday 12/16", "", "", "", 0, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Tuesday 12/17", "", "", "", 1, "13:30:23", "13:50:00", "", ""));
		tasks.push(new task(1, "test task Thursday 12/19", "", "", "", 3, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Saturday 12/21", "", "", "", 5, "13:30:23", "13:50:00", "", ""));
		tasks.push(new task(1, "test task Sunday 12/22", "", "", "", 6, "00:30:23", "01:00:00", "", ""));
		tasks.push(new task(2, "test task Sunday 12/22", "", "", "", 6, "13:30:23", "13:50:00", "", ""));
	}
	// get tasks for week starting @date from database and add all to "tasks" array
	
	console.log(tasks);
	return tasks;
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
	$(targetElement).append('<div class="mt-4">M O N D A Y</div>');
	$(targetElement).append('<hr/>');
	$(targetElement).append('<div name="mondayNothing" class="text-muted text-center w-100"><i>Nothing yet</i></div>');	
	monTasks.forEach(function(task) {
		$(targetElement).append(`
			<div class="row no-gutters mb-1">
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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
				<div class="col-3 time-assignment d-flex">
					<div class="justify-content-center align-self-center font-weight-bold" style="padding-left:10px">` + task.startTime + `</div>
				</div>
				<div class="col-9 border half-round">
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

$(document).ready(function() {	
	// get first day of current week
	shownWeek = new Date();
	shownWeek.setDate(shownWeek.getDate() - ((shownWeek.getDay() == 0) ? 6 : shownWeek.getDay() - 1));
	lastWeek = new Date(shownWeek.getTime());
	nextWeek = new Date(shownWeek.getTime());
	lastWeek.setDate(lastWeek.getDate() - 7);
	nextWeek.setDate(nextWeek.getDate() + 7);
	
	// set up initial carousel weeks
	buildWeekHTML(shownWeek, "#week2slide");
	buildWeekHTML(lastWeek, "#week1slide");
	buildWeekHTML(nextWeek, "#week3slide");
	
	$("#shownWeekHeader").text("Week of " + formatDate1(shownWeek));
	
	// rebuild neighboring week when carousel slides
	$('#weeklyCarousel').on('slid.bs.carousel', function(e) {
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
		
		$("#shownWeekHeader").text("Week of " + formatDate1(shownWeek));
	})
	
	/*
	$(".calenday").click(function() {
		$(this).addClass('active');
		$(".calenday").not(this).removeClass('active');
	});
	
	$('#calendarCarousel').on('slide.bs.carousel', function(e) {
		if (e.direction == "left") {
			shownDate.setMonth(shownDate.getMonth()-1);
			shownDate.setDate(1);
			switch (lastMonthPane) {
				case "month1":
					lastMonthPane = "month2";
					currentMonthPane = "month3";
					nextMonthPane = "month1";
				case "month2":
					lastMonthPane = "month3";
					currentMonthPane = "month1";
					nextMonthPane = "month2";
				case "month3":
					lastMonthPane = "month1";
					currentMonthPane = "month2";
					nextMonthPane = "month3";
					}
			}
		}
		else {
			shownDate.setMonth(shownDate.getMonth()+1);
			shownDate.setDate(1);
			switch (lastMonthPane) {
				case "month1":
					lastMonthPane = "month1";
					currentMonthPane = "month2";
					nextMonthPane = "month3";
				case "month2":
					lastMonthPane = "month2";
					currentMonthPane = "month3";
					nextMonthPane = "month1";
				case "month3":
					lastMonthPane = "month3";
					currentMonthPane = "month1";
					nextMonthPane = "month2";
			}
		}
		
		updateCalendar();
	})*/
});

/*
function updateCalendar() {
	var start, end;
	var currentMonth = months[shownDate.getMonth()];
	var currentDay = shownDate.getDay();
	var currentDate = shownDate.getDate();
	var currentYear = shownDate.getYear();
	
	var lastMonth = months[shownDate.getMonth()-1];
	
	var nextMonth = months[shownDate.getMonth()+1];
	
	$('#'+currentMonthPane).innerText = currentMonth;
	$('#'+lastMonthPane).innerText = lastMonth;
	$('#'+nextMonthPane).innerText = nextMonth;
	
	if (date.getDay() == 0) {
		start = 8;
		end = monthDays[currentMonth] + 8;
	}
	else {
		start = date.getDay();
		end = monthDays[currentMonth] + date.getDay();
	}
	
	for (i = 1; i <= 42; i++) {
		if (i < start) {
			$('#'+currentMonthPane).find('td[name ="'+i+'"]').innerText = start - ;
	}
}

function editClassClick(source) {
	var course = "class".concat(source.substring(4));
	
}
*/