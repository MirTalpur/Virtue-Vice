var parseInit = false;
if (!parseInit) {
    Parse.initialize('ms6BSiOOzXCmkZuNMEKAbk3AiDlaWff1Yutqmb5Z', '7xOFDK3eApzVXxX8ntQBPeYSAKX7t5DXmMT8O5mZ');
    parseInit = true;
}

function authSession() {
    var currentUser = Parse.User.current();
    if (currentUser) {

    } else {
        window.location.href = '../src/login.html';
    }
}

function getCurrentUser() {
    var currentUser = Parse.User.current();
    if (currentUser) {
        return currentUser;
    } else {
        window.location.href = '../src/login.html';
    }
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

function onClickForgotPassword() {
    var email = document.getElementById('usermail').value;
    if (email == null || email == "") {
        alert('Must provide an email to send a password reset email to');
        return;
    }
    Parse.User.requestPasswordReset(email, {
        success: function(user) {
            alert('We have sent a password reset request to ' + email);
        },
        error: function(user, error) {
            alert(error.message);
        }
    });
}

function onClickSignUp() {

    var user = new Parse.User();
    var email = document.getElementById('usermail').value;
    var password = document.getElementById('password').value;
    if (email == null || email == "") {
        alert('Must provide an email');
        return;
    }
    if (password == null || password == "") {
        alert('Must provide a password');
        return;
    }
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    user.signUp(null, {
        success: function(user) {
            var signUpText = document.getElementById('signInMessage');
            signUpText.style.display = 'block';
            window.location.href = '../src/welcome.html';
        },
        error: function(user, error) {
            alert(error.message);
        }
    });

}

function onClickLogout(){
    Parse.User.logOut();
    window.location.href = '../src/login.html';
}

var iconSrc = '';

function selectImage(name) {
    //Clear all the other effects
    document.getElementById('icon1').style.border = 'none';
    document.getElementById('icon2').style.border = 'none';
    document.getElementById('icon3').style.border = 'none';
    document.getElementById('uploadImg').style.border = 'none';
    var image = document.getElementById(name);
    image.style.border = '5px solid #42A5F5';

    //set icon source to send to parse
    if (name === 'icon1') {
        iconSrc = '../img/sleep.jpg';
    } else if (name === 'icon2') {
        iconSrc = '../img/salad.jpg';
    } else if (name === 'icon3') {
        iconSrc = '../img/run.jpg';
    } else if (name === 'uploadImg') {
        iconSrc = document.getElementById('uploadImg').src;
        //alert("iconSrc:  " + iconSrc);
        //iconSrc = "upload"
    }
}

function checkWeeklyFreq() {
    var total = 0;
    for (var i = 0; i < 6; i++) {
        if (document.form.date[i].checked) {
            return true;
        }
    }
    //none checked
    alert('Please select at least one day');
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
    var others = document.getElementById('others');
    //no daily frequency checked
    if (!(others.value)) {
        alert('Please specify a daily frequency');
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

function setTitle(name) {
    var title = document.querySelector('#title');
    title.value = name;
}

function setDailyFreq(frequency) {
    var form = document.querySelector('#editForm');
    if (frequency === 1) {
        form.day[0].checked = true;
    } else if (frequency === 2) {
        form.day[1].checked = true;
    } else if (frequency === 3) {
        form.day[2].checked = true;
    } else {
        document.getElementById('others').value = frequency;
    }

}

function setWeekdays(days) {
    var form = document.querySelector('#editForm');
    for (var i = 0; i < days.length; i++) {
        if (days[i]) {
            //set weekday index to true

            form.date[i].checked = true;
        } else {
            form.date[i].checked = false;
        }
    }
}

function parseImg(src) {

    if (src.indexOf("salad") > -1) {
        selectImage('icon2');
    } else if (src.indexOf("sleep") > -1) {
        selectImage('icon1');
    } else if (src.indexOf("run") > -1) {
        selectImage('icon3');
    } 
    else{
        var img = document.getElementById("uploadImg");
        img.src = src;
        img.style.display = 'block';
        selectImage('uploadImg');
    }
}

function addFile() {
        document.getElementById('iconUpload').click();    
}

function uploadImage(x) {
    var uploadfile = document.getElementById('iconUpload');
    var fReader = new FileReader();
    fReader.readAsDataURL(uploadfile.files[0]);
    fReader.onloadend = function(event){
        var img = document.getElementById("uploadImg");
        img.src = event.target.result;
        img.style.display = 'block';
        selectImage('uploadImg');
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
            alert('Please select only one daily frequency');
            document.form.day[j].checked = false;
            return false;
        }
    }
}
//still need to enable file upload of image
function addHabit(e) {
    e.preventDefault();

    if (!iconSrc) {
        alert('Please select an icon');
    } else if ((!(checkWeeklyFreq()))) {} else if (!(checkDailyFreq())) {} else {
        var Habit = Parse.Object.extend('Habit');
        //create habit
        var habit = new Habit();


        var fileUploadControl = document.getElementById('iconUpload');

        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            var name = "icon.jpg";
            var parseFile = new Parse.File(name, file);
            parseFile.save().then(function() {
                // The file has been saved to Parse.
                alert('file saved');
                habit.set('iconUpload', parseFile);

                        var title = document.getElementById('title').value; //get title

        getWeekdays(); //get weekly frequency
        habit.set('owner', getCurrentUser());
        habit.set('title', title); //set title
        habit.set('icon', iconSrc); //set icon
        if(iconSrc = '../img/salad.jpg'){
                monitorFood();
            }
        if(iconSrc = '../img/sleep.jpg'){
                monitorSleep();
            }
        if(iconSrc = '../img/run.jpg'){
                monitorExercise();
        }
        habit.set('weekdays', myDays); //set weekly frequency
        habit.set('times', times); //set daily frequency
        habit.set('done', false); //set default status
        habit.set('current_record', 0); //set current record
        habit.set('best_record', 0); //set best record

        //Save Habit to Parse
        habit.save(null, {
            success: function(habit) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + habit.id);
                window.location.href = '../src/list.html';
            },
            error: function(habit, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.code + ' habit info: ' + habit.message);
            }
        });
            
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                alert('error: file not saved');
            });
        } else {
            //alert('Select a file');
            var title = document.getElementById('title').value; //get title
            getWeekdays(); //get weekly frequency
            habit.set('owner', getCurrentUser());
            habit.set('title', title); //set title
            habit.set('icon', iconSrc); //set icon
            habit.set('weekdays', myDays); //set weekly frequency
            habit.set('times', times); //set daily frequency
            habit.set('done', false); //set default status
            habit.set('current_record', 0); //set current record
            habit.set('best_record', 0); //set best record

            //Save Habit to Parse
            habit.save(null, {
                success: function(habit) {
                    // Execute any logic that should take place after the object is saved.
                    //alert('New object created with objectId: ' + habit.id);
                    window.location.href = '../src/list.html';
                },
                error: function(habit, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.code + ' habit info: ' + habit.message);
                }
            });
        }
        /*var title = document.getElementById('title').value; //get title
        getWeekdays(); //get weekly frequency
        habit.set('owner', getCurrentUser());
        habit.set('title', title); //set title
        habit.set('icon', iconSrc); //set icon
        habit.set('weekdays', myDays); //set weekly frequency
        habit.set('times', times); //set daily frequency
        habit.set('done', false); //set default status
        habit.set('current_record', 0); //set current record
        habit.set('best_record', 0); //set best record

        //Save Habit to Parse
        habit.save(null, {
            success: function(habit) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + habit.id);
                window.location.href = '../src/list.html';
            },
            error: function(habit, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.code + ' habit info: ' + habit.message);
            }
        });*/
    }
}
var dayStreak = {};
var bestRecord = {};

// init list
function addHabitToList() {
    //get title from parse object
    var Habit = Parse.Object.extend('Habit');
    var query = new Parse.Query(Habit);
    var user = getCurrentUser();
    //query.equalTo('title', '*');
    //var getTitle = ';
    var habitList = document.getElementById('habit-list');
    query.equalTo("owner", user);
    query.find({
        success: function(results) {
            //alert('Successfully retrieved ' + results.length + ' scores.');
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {

                var element = results[i];
                var title = element.get('title');
                var iconSrc = element.get('icon');
                dayStreak[title] = element.get('current_record');
                bestRecord[title] = element.get('best_record');
                //var days = element.get('weekdays');

                var htmlEle = document.getElementById('habitTemplate').cloneNode(true);
                htmlEle.hidden = false;
                htmlEle.querySelector(".habit-name").innerHTML = title;

                htmlEle.querySelector(".habit-icon").src = iconSrc;
                htmlEle.querySelector(".day-streak").innerHTML = dayStreak[title];
                htmlEle.querySelector(".best-record").innerHTML = bestRecord[title];
                initProgress(htmlEle, title);

                habitList.appendChild(htmlEle);

            }
        }
    });
}

function editHabit(element) {
    var habitName = element.parentNode.parentNode.getElementsByClassName('habit-name')[0].innerHTML;
    sessionStorage.setItem('editingHabit', habitName);
    location.href = 'edit.html';

}



function loadEdit() {
    var habitName = sessionStorage.getItem('editingHabit');

    var Habit = Parse.Object.extend('Habit');
    var query = new Parse.Query(Habit);
    query.equalTo('title', habitName);
    query.find().then(function(result) {
        var parseFile = result[0].get('iconUpload');
        if(parseFile == "" || parseFile == null){
            parseImg(result[0].get('icon'));
        } else {
            parseImg(parseFile.url());
        }
        
        setDailyFreq(result[0].get('times'));
        setWeekdays(result[0].get('weekdays'));
        setTitle(habitName);
    });
}

function submitEdit(e) {

    e.preventDefault();

    if (!iconSrc) {
        alert('Please select an icon');
    } else if ((!(checkWeeklyFreq()))) {} else if (!(checkDailyFreq())) {} else {
        var Habit = Parse.Object.extend('Habit');

        var title = document.getElementById('title').value; //get title
        getWeekdays(); //get weekly frequency

        var query = new Parse.Query(Habit);
        query.equalTo('title', sessionStorage.getItem('editingHabit'));
        query.find({

            success: function(habit) {
                habit[0].set('title', title); //set title
                habit[0].set('icon', iconSrc); //set icon
                habit[0].set('weekdays', myDays); //set weekly frequency
                habit[0].set('times', times); //set daily frequency
                habit[0].save();
                location.href = 'list.html';
            }
        });
    }
}

// var listItems = document.getElementById('habit-list').children;

// len = listItems.length;

// // Initializing list
// for (var i = 0; i < len; i++) {
//     var habitName = listItems[i].getElementsByClassName('habit-name')[0].innerHTML;
//     dayStreak[habitName] = 0;
//     bestRecord[habitName] = 0;

//     listItems[i].getElementsByClassName('best-record')[0].innerHTML = 0;
//     listItems[i].getElementsByClassName('day-streak')[0].innerHTML = 0;
// }

function showMsg(element) {
    var msgElement = (element.parentNode.parentNode.getElementsByClassName("message"))[0];
    // alert(msgElement.innerHTML);
    msgElement.style.visibility = "visible";
}

function deleteHabit(element) {
    if (confirm("Do you want to delete this habit?")) {
        var child = element.parentNode.parentNode;
        var habitName = child.getElementsByClassName('habit-name')[0].innerHTML;
        var parent = child.parentNode;

        var Habit = Parse.Object.extend('Habit');
        var query = new Parse.Query(Habit);
        query.equalTo('title', habitName);
        query.find().then(function(result) {

            result[0].destroy();
        });
        child.style.opacity = "0";
        child.style.transition = "opacity 500ms linear";
        setTimeout(function() {
                parent.removeChild(child);
            },
            800);
    } else { /*do nothing*/ }

}

function initProgress(element, name) {
    var progress = element.querySelector(".progress");


    var percentage = (dayStreak[name] / 10) * 100;
    if (percentage > 100) {
        percentage = 100;
    }
    requestAnimationFrame(function() {
        percentage = percentage.toString() + '%';
        progress.style.transition = "width .5s linear";
        progress.style.width = percentage;
    });
}

function increaseProgress(element) {
    var habitName = element.parentNode.parentNode.getElementsByClassName('habit-name')[0].innerHTML;
    var progress = element.parentNode.parentNode.getElementsByClassName("progress")[0];
    var percentage = (dayStreak[habitName] / 10) * 100;
    if (percentage > 100) {
        percentage = 100;
    }
    requestAnimationFrame(function() {
        percentage = percentage.toString() + '%';

        progress.style.transition = "width .5s linear";
        progress.style.width = percentage;
    });
}

function resetProgress(element) {
    bar = element.parentNode.parentNode.getElementsByClassName("progress")[0];

    requestAnimationFrame(function() {
        bar.style.transition = "width 1s linear";
        bar.style.width = "0px";
    });
}

function thumbsUp(element) {
    var habitName = element.parentNode.parentNode.getElementsByClassName('habit-name')[0].innerHTML;
    var Habit = Parse.Object.extend('Habit');
    var query = new Parse.Query(Habit);
    dayStreak[habitName]++;

    if (dayStreak[habitName] > bestRecord[habitName]) {
        bestRecord[habitName]++;
        var best = element.parentNode.parentNode.getElementsByClassName('best-record')[0];
        best.innerHTML = bestRecord[habitName];
    }
    var days = element.parentNode.parentNode.getElementsByClassName('day-streak')[0];
    days.innerHTML = dayStreak[habitName];

    query.equalTo('title', habitName);
    query.find({

        success: function(result) {

            result[0].increment('current_record');
            result[0].set('best_record', bestRecord[habitName]);

            result[0].save();
        }
    });
}

function thumbsDown(element) {
    var habitName = element.parentNode.parentNode.getElementsByClassName('habit-name')[0].innerHTML;
    var Habit = Parse.Object.extend('Habit');
    var query = new Parse.Query(Habit);
    query.equalTo('title', habitName);
    query.find({

        success: function(result) {

            result[0].set('current_record', 0);
            result[0].save();
        }
    });
    dayStreak[habitName] = 0;
    var days = element.parentNode.parentNode.getElementsByClassName('day-streak')[0];
    days.innerHTML = dayStreak[habitName];
}

//Functions to check for user usage -->
function monitorFood() {
    var dimensions = {
    // What is the user trying to do?
    category: 'Change Food Habits'
    };
    // Send the dimensions to Parse along with the 'search' event
    Parse.Analytics.track('habit', dimensions);
}

function monitorSleep() {
    var dimensions = {
    // What is the user trying to do?
    category: 'Change Sleeping Habits'
    };
    // Send the dimensions to Parse along with the 'search' event
    Parse.Analytics.track('habit', dimensions);
}

function monitorExercise() {
    var dimensions = {
    // What is the user trying to do?
    category: 'Change Exercise Habits'
    };
    // Send the dimensions to Parse along with the 'search' event
    Parse.Analytics.track('habit', dimensions);
}