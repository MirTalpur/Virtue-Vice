var parseInit = false;
if (!parseInit) {
	Parse.initialize("ms6BSiOOzXCmkZuNMEKAbk3AiDlaWff1Yutqmb5Z", "7xOFDK3eApzVXxX8ntQBPeYSAKX7t5DXmMT8O5mZ");
	parseInit = true;
}

function onClickSignIn() {
	var email = document.getElementById('usermail').value;
	var password = document.getElementById('password').value;
	Parse.User.logIn(email, password, {
		success: function(user) {
			alert('Login success');
			window.location.href = '../src/welcome.html';
		},
		error: function(user, error) {
			alert('Error: ' + error.code + ' ' + error.message);
		}
	});
}

function onClickSignUp() {
	var signUpText = document.getElementById('signInMessage');
	signUpText.style.display = 'block';
	var user = new Parse.User();
	var email = document.getElementById('usermail').value;
	var password = document.getElementById('password').value;
	console.log(password);
	user.set('username', email);
	user.set('email', email);
	user.set('password', password);
	user.signUp(null, {
		success: function(user) {
			alert('Sign up success');
			window.location.href = '../src/welcome.html';
		},
		error: function(user, error) {
			alert('Error: ' + error.code + ' ' + error.message);
		}
	});

}

var iconSrc = "";
function selectImage(name)
{
    //Clear all the other effects
    document.getElementById('icon1').style.border = "none";
    document.getElementById('icon2').style.border = "none";
    document.getElementById('icon3').style.border = "none";
    var image = document.getElementById(name);
    image.style.border = "5px solid #42A5F5";

    //set icon source to send to parse
    iconSrc = image.src;
}

function checkWeeklyFreq() {
    var total = 0;
    for (var i = 0; i < document.form.day.length; i++) {
        if (document.form.date[i].checked) {
            return true;
        }
    }
    //none checked
    alert("Please select at least one day");
    return false;
}
//check if others field specified when no df checked
var times = 0; //daily frequency
function checkDailyFreq() {
    for (var i = 0; i < document.form.day.length; i++) {
        if (document.form.day[i].checked) {
            times = i + 1;
            return true;
        }
    }
    var others = document.getElementById("others");
    //no daily frequency checked
    if (!(others.value)) {
        alert("Please specify a daily frequency");
        return false;
    } else {
        times = others.value;
        return true;
    }
}


//sun, mon, tue, .., sat
var myDays = [false, false, false, false, false, false, false];
function getWeekdays() {
    for (var i = 0; i < document.form.date.length; i++) {
        if (document.form.date[i].checked) {
            //set weekday index to true
            myDays[i] = true;
        }
    }
}

function checkBoxcontrol(j) {
    var total = 0;
    //include check for others field
    for (var i = 0; i < document.form.day.length; i++) {
        if (document.form.day[i].checked) {
            total = total + 1;
        }
        if (total > 1) {
            alert("Please select only one daily frequency");
            document.form.day[j].checked = false;
            return false;
        }
    }
}
//still need to enable file upload of image
function addHabit()
{
    event.preventDefault();

    if (!iconSrc) { alert("Please select an icon");}
    else if ((!(checkWeeklyFreq()))){}
    else if (!(checkDailyFreq())) {}

else {
    var Habit = Parse.Object.extend("Habit");
    //create habit
    var habit = new Habit();

    var title = document.getElementById("title").value; //get title
    getWeekdays();   //get weekly frequency

    habit.set("title", title);      //set title
    habit.set("icon", iconSrc);     //set icon
    habit.set("weekdays", myDays);  //set weekly frequency
    habit.set("times", times);      //set daily frequency
    habit.set("done", false);       //set default status
    habit.set("current_record", 0);  //set current record
    habit.set("best_record", 0);     //set best record

    //Save Habit to Parse
    habit.save(null, {
        success: function (habit) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + habit.id);
            window.location.href = '../src/list.html';
        },
        error: function (habit, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.code + ' habit info: '+ habit.message);
        }
    });
    }
}

function addHabitToList() {
    //get title from parse object
    var Habit = Parse.Object.extend("Habit");
    var query = new Parse.Query(Habit);
    //query.equalTo("title", "*");
    //var getTitle = "";
    query.find({
        success: function (results) {
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                //alert(object.id + ' - ' + object.get('title'));
                //retrieve parse data
                var getTitle = object.get('title');
                iconImagePath = object.get('icon');

                //set up habit info class html structure
                var parentHabit = document.createElement("li");
                var firstChild = document.createElement("ul");
                firstChild.setAttribute("class", "habit-info");

                var parentTitle = document.createElement("li");
                var title = document.createElement("div");
                title.setAttribute("class", "habit-name");

                var parentIcon = document.createElement("li");
                var icon = document.createElement("img");
                icon.setAttribute("class", "habit-icon");
                icon.setAttribute("src",iconImagePath);
                icon.setAttribute("alt", "habit icon");
                parentIcon.appendChild(icon);

                //add habit title
                var titleText = document.createTextNode(getTitle);
                title.appendChild(titleText);
                parentTitle.appendChild(title);
                
                firstChild.appendChild(parentTitle);
                firstChild.appendChild(parentIcon);
                parentHabit.appendChild(firstChild);

                //create habit-list
                //var habit_list = document.createElement("ul");
                //habit_list.setAttribute("id", "habit-list");

                var habit_list = document.getElementById("habit-list");
                habit_list.appendChild(parentHabit);                

                //habit message html structure
                var habit_message = document.createElement("div");
                habit_message.setAttribute("class", "message");
                var spanTotal = document.createElement("span");
                spanTotal.setAttribute("class", "message-total");
                var spanText = document.createTextNode("48 days in a row! Best Record: 60");
                var progressBar = document.createElement("svg");
                progressBar.setAttribute("height", "25");
                progressBar.setAttribute("width", "150");
                var line1 = document.createElement("line");
                line1.setAttribute("x1", "0");
                line1.setAttribute("y1", "0");
                line1.setAttribute("x2", "75");
                line1.setAttribute("y2", "0");
                line1.setAttribute("style", "stroke:rgba(65, 131, 215, 0.8);stroke-width:25");
                progressBar.appendChild(line1);

                var line2 = document.createElement("line");
                line2.setAttribute("x1", "75");
                line2.setAttribute("y1", "0");
                line2.setAttribute("x2", "150");
                line2.setAttribute("y2", "0");
                line2.setAttribute("style", "stroke:rgba(171,171,171,0.6);stroke-width:25");
                progressBar.appendChild(line2);

                var spanToday = document.createElement("span");
                spanToday.setAttribute("class", "message-today");
                var spanTextToday = document.createTextNode("Completed 1/3 for today!");

                //add text here
                spanTotal.appendChild(spanText);
                spanTotal.appendChild(document.createElement("br"));
                spanTotal.appendChild(progressBar);
                spanToday.appendChild(spanTextToday);
                
                habit_message.appendChild(spanTotal);
                habit_message.appendChild(document.createElement("br"));
                habit_message.appendChild(spanToday);

                parentHabit.appendChild(habit_message);

                //habit-op html structure
                var habit_op = document.createElement("div");
                habit_op.setAttribute("class", "habit-op");

                var button_done = document.createElement("button");
                button_done.setAttribute("type", "button");
                button_done.setAttribute("class", "op op-done");
                button_done.setAttribute("onclick", "showMsg(this);");
                button_done.setAttribute("title", "done");

                var img_done = document.createElement("img");
                img_done.setAttribute("src", "../img/done.svg");
                img_done.setAttribute("alt", "Done");

                button_done.appendChild(img_done);
                habit_op.appendChild(button_done);

                var button_edit = document.createElement("button");
                button_edit.setAttribute("type", "button");
                button_edit.setAttribute("class", "op op-edit");
                button_edit.setAttribute("onclick", "location.href='edit.html'");
                button_edit.setAttribute("title", "edit habit");

                var img_edit = document.createElement("img");
                img_edit.setAttribute("src", "../img/edit.svg");
                img_edit.setAttribute("alt", "Edit");

                button_edit.appendChild(img_edit);
                habit_op.appendChild(button_edit);

                var button_del = document.createElement("button");
                button_del.setAttribute("type", "button");
                button_del.setAttribute("class", "op op-del");
                button_del.setAttribute("onclick", "deleteHabit(this);");
                button_del.setAttribute("title", "delete habit");

                var img_del = document.createElement("img");
                img_del.setAttribute("src", "../img/delete.svg");
                img_del.setAttribute("alt", "Del");

                button_del.appendChild(img_del);
                habit_op.appendChild(button_del);
                parentHabit.appendChild(habit_op);

            }

        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

