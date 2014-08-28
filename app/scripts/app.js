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
    'perfect_scrollbar',
    'ui.bootstrap' 
  ])
  .config(function ($routeProvider, $facebookProvider, $locationProvider, $httpProvider) {
	
	var access = routingConfig.accessLevels;
	console.log(access);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        access:      access.anon
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        access:      access.anon
      })
      .when('/linkedin', {
        templateUrl: 'views/linkedin.html',
        controller: 'LinkedinCtrl',
        access:      access.user
      })
      .when('/linkedin-dashboard', {
        templateUrl: 'views/linkedin-dashboard.html',
        controller: 'LinkedinDashboardCtrl',
        access:      access.user
      })
      .when('/linkedin-success', {
        templateUrl: 'views/linkedin-success.html',
        controller: 'LinkedinSuccessCtrl',
        access:      access.user
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        access:      access.user
      })
      .when('/signup-denied', {
        templateUrl: 'views/signup-denied.html',
        controller: 'SignupDeniedCtrl',
        access:      access.user
	  })
      .when('/mobile-verify', {
        templateUrl: 'views/mobile-verify.html',
        controller: 'MobileVerifyCtrl',
        access:      access.user
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        access:      access.anon
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
      .when('/discussion-topics', {
        templateUrl: 'views/discussion-topics.html',
        controller: 'DiscussionTopicsCtrl'
      })
      .when('/discussion', {
        templateUrl: 'views/discussion.html',
        controller: 'DiscussionCtrl'
      })
      .when('/admin-add-discussion', {
        templateUrl: 'views/admin-add-discussion.html',
        controller: 'AdminAddDiscussionCtrl',
        access:      access.user
      })
      .when('/admin-discussion-list', {
        templateUrl: 'views/admin-discussion-list.html',
        controller: 'AdminDiscussionListCtrl',
        access:      access.user
      })
      .when('/admin-topic-list', {
        templateUrl: 'views/admin-topic-list.html',
        controller: 'AdminTopicListCtrl',
        access:      access.user
      })
      .when('/admin-add-topic', {
        templateUrl: 'views/admin-add-topic.html',
        controller: 'AdminAddTopicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $facebookProvider.setAppId('278995965634637');
    $facebookProvider.setPermissions("email,user_likes,user_birthday,user_relationships,user_work_history,user_hometown,user_location,user_friends");
    
    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                	localStorageService.clearAll();
                    $location.path('/');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        }
    });
  });

angular.module('sassApp').run( function($rootScope, $location, $http, regService, localStorageService) {
	  // Load the facebook SDK asynchronously
	var authData = localStorageService.get('user');
	console.log(authData);
	 if (authData == null){
		 var accessLevels = routingConfig.accessLevels
	        , userRoles = routingConfig.userRoles;
		 localStorageService.set('user', {
			 username: '',
			 role: userRoles.public
         });
	 }	
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.error = null;
        console.log(next.access);
        console.log(next);
        if (!regService.authorize(next.access)) {
        	 console.log('jii');
        	 $location.path('/')
        	 //if(regService.isLoggedIn()) $location.path('/');
            // else                  $location.path('/login');
        }
    });
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

angular.module('sassApp').config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});
