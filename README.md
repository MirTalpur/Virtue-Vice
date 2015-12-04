# Virtue-Vice
Break your bad habits with Virtue/Vice
==GitHub page==
https://github.com/MirTalpur/Virtue-Vice
=== Virtue/Vice===
Contributors: Mir Ali Talpur,Bhavik Upadhyaya,Rachel Schneiderman,Yasin Ahmed,Henry Wang
Might Requires latest browsers with notification features for best results

== Description ==
Virtue-Vice: Is a web app which helps you break you bad habits or keep good ones by logging them and having an 
online source to keep track of days you've went without doing that certain activity or vice-versa 

===Contribution Source ===
Mir Ali Talpur- Handled the merging of different features
Bhavik Upadhyaya- Added the deletion, edit, login and authenication for the applicaiton and set up parse

Rachel Schneiderman- Added the thumbs up and down functionality and made sure it aligned correctly

Yasin Ahmed- Worked on the add page to make sure it gets shown on the list page when addition is made.

Henry Wang-  Implemented web notifications framework for the web app. Selected the Web Notifications framework provided by MDN(Mozilla). This was a better selection after conducting research for different types of web notification frameworks due to the simplicity and convenience of implementing it to work with our web app. Methods were provided available for Notification objects, which were used to request permissions from the user and then one of the many options were then selected. For example, if the permissions were accepted then the user would be presented with a notification to remind them about updating their habits. Additionally, I worked on the data monitoring and error tracking aspects for this web app. I used Rollbar for error tracking because it easily tracks unexpected bugs and crashes; additionally, it emails members included in the project about the type and details of the crash. Moreover, I used Parse Analytics to track custom breakdown events of the user. It would show us how frequently users were trying to change specific types of habits

==More Information==
Included are an apk file for the Android version (In the Android-iOS app files folder 'android-debug.apk') and the iOS version (same folder but named ‘virtue-vice’). These files are produced from Ionic Framework which is built off of Apache Cordova which is built from PhoneGap. If you want to install Ionic and you have node the command is: ’npm install -g cordova ionic’, then you can emulate the project with android or iOS by using ‘ionic emulate ios’. Either way the .apk file and .app files are provided if you want to just run it in an emulator without installing ionic. Functionality included in both of the apps is Creating an account, logging in, resetting password, adding a habit, viewing your habits. Since Ionic uses AngularJS there were some things I didnt have time to adjust given our limited time on this project. For instance, since AngularJS doesent allow direct modification of the DOM I did not have enough time to change the habit list into a collection repeat as It would have involved changing many of the other functions which manipulated the DOM to show a different screen to the user. As a result of this, the functionality of the Habit List page is close to non-existant since I was not able to use the functions that were previously created to manipulate the list of habits in the DOM. Some things I had to add to make the transition from web packaging to mobile packaging includes the use of Content Security meta tags for Android. One thing I noticed is that the iOS app worked fine without the Content Security meta tag but Android would give me a blank page since it was blocking the use of Parse DB script tag. I have encountered this behaviour before so I knew that I needed to add the Cordova Whitelist plugin which allows the developer to whitelist certain ‘trusted’ urls so that android will allow the script to run. In addition, some of the css looks weird or  mobile apps, for instance the button on the habit list page disappears sometimes when scrolling down the page on android/ios. Given more time I would also fix UI disparity across platforms… i.e android users expect Material designed applications while iOS users expects iOS design (not sure if it has a specific name). Ionic Framework tries to tackle this problem with its own unique tags which when built are applied different styles depending on which platform the user is on.

== Uploading and Icon ==
For uploading an icon to a habit we used a hidden input element of type file within the add icon button to allow the user to select which file they wanted to upload. Once the user selected the image, we used a hidden img element of the icon class and modified its display property to show the icon with the uploaded image. Once the user decided to save the habit, the image was upload to parse as a parse file. Once the file of the icon was on parse, it was updated within the habit in list.html as well as edit.html when that habit was selected for edit.
