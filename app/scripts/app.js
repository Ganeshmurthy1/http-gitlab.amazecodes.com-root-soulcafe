'use strict';

/**
 * @ngdoc overview
 * @name sassApp
 * @description
 * # sassApp
 *
 * Main module of the application.
 */
angular
  .module('sassApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'linkedinServices',
    'ngFacebook',
    'LocalStorageModule',
    'perfect_scrollbar'
  ])
  .config(function ($routeProvider, $facebookProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/linkedin', {
        templateUrl: 'views/linkedin.html',
        controller: 'LinkedinCtrl'
      })
      .when('/linkedin-dashboard', {
        templateUrl: 'views/linkedin-dashboard.html',
        controller: 'LinkedinDashboardCtrl'
      })
      .when('/linkedin-success', {
        templateUrl: 'views/linkedin-success.html',
        controller: 'LinkedinSuccessCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/signup-denied', {
        templateUrl: 'views/signup-denied.html',
        controller: 'SignupDeniedCtrl'
	  })
      .when('/mobile-verify', {
        templateUrl: 'views/mobile-verify.html',
        controller: 'MobileVerifyCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/profile_comments', {
        templateUrl: 'views/profile_comments.html',
        controller: 'ProfileCommentsCtrl'
      })
      .when('/side_menu', {
        templateUrl: 'views/side_menu.html',
        controller: 'SideMenuCtrl'
      })
      .when('/side_bar', {
        templateUrl: 'views/side_bar.html',
        controller: 'SideBarCtrl'
      })
      .when('/discussion-list', {
        templateUrl: 'views/discussion-list.html',
        controller: 'DiscussionListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $facebookProvider.setAppId('278995965634637');
    $facebookProvider.setPermissions("email,user_likes,user_birthday,user_relationships,user_work_history,user_hometown,user_location,user_friends");
  });

angular.module('sassApp').run( function() {
	  // Load the facebook SDK asynchronously
	  (function(){
	     // If we've already installed the SDK, we're done
	     if (document.getElementById('facebook-jssdk')) {return;}

	     // Get the first script element, which we'll use to find the parent node
	     var firstScriptElement = document.getElementsByTagName('script')[0];

	     // Create a new script element and set its id
	     var facebookJS = document.createElement('script'); 
	     facebookJS.id = 'facebook-jssdk';

	     // Set the new script's source to the source of the Facebook JS SDK
	     facebookJS.src = '//connect.facebook.net/en_US/all.js';

	     // Insert the Facebook JS SDK into the DOM
	     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
	   }());
	});
