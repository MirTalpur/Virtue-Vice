// Checking if browser supports notifications
if (window.webkitNotifications) {
    console.log('Your web browser does support notifications!');
} else {
    console.log('Your web browser does not support notifications!');
  console.log('Your web browser does support notifications!');
} else {
  console.log('Your web browser does not support notifications!');
}


// Checking permissions
/*if (window.webkitNotifications.checkPermission() == 0) {
    // Good to go, you can create a notification.
} else {
    window.webkitNotifications.requestPermission(function(){});
}*/

document.querySelector('#show_button').addEventListener('click', function() {
  // 0 - ALLOWED, 1 - NOT ALLOWED, 2 - DENIED
  if (window.webkitNotifications.checkPermission() == 0) {
    // function defined in step 2
    notification_test = window.webkitNotifications.createNotification(
      'notification.png', 'Remember to fill in your habit status', 'Click to go');
    notification_test.onclick = function() {
      window.location = 'list.html'
    }
    //notification_test.ondisplay = function() { ... do something ... };
    //notification_test.onclose = function() { ... do something else ... };
    notification_test.show();
  } 
  else {
        window.location = 'list.html'
      }
      //notification_test.ondisplay = function() { ... do something ... };
      //notification_test.onclose = function() { ... do something else ... };
    notification_test.show();
  } else {
    window.webkitNotifications.requestPermission();
  }
}, false);

// Creating a notification
var myNotification = window.webkitNotifications.createNotification('icon.png', 'Item Saved', 'My Application Name');
myNotification.show(); //show the notification

// 
var myNotification = window.webkitNotifications.createNotification('mike.png', 'New Content Available', 'Click to view');
myNotification.onclick = function() {
    window.location = 'http://teamtreehouse.com/new/content';
  window.location = 'http://teamtreehouse.com/new/content';
}
myNotification.show();