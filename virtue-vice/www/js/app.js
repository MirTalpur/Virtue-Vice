// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'app.controllers'])

.config(function($stateProvider, $urlRouterProvider) {

        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // login state that is needed to log the user in after logout
        // or if there is no user object available
        .state('app-login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'MainController'
        })

        .state('app-welcome', {
            url: '/welcome',
            templateUrl: 'templates/welcome.html',
            controller: 'MainController'
        })
        .state('app-home', {
            url: '/home',
            templateUrl: 'templates/list.html',
            controller: 'MainController'
        })
        .state('app-add', {
            url: '/add',
            templateUrl: 'templates/add.html',
            controller: 'MainController'
        })
        .state('app-edit', {
            url: '/edit',
            templateUrl: 'templates/edit.html',
            controller: 'MainController'
        });

        $urlRouterProvider.otherwise('/login');
})

.run(function($ionicPlatform) {
  Parse.initialize('rPfDJ1pMWsSCHvwiHBbDthCwDB97CGh2zSx5xsLP', 'V7yR4PUw6dlKCQYZpp3GDRKTZsanVDaJLVXHHI8B');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  
});
