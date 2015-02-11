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
    'ui.bootstrap',
    'angularFileUpload',
    'ui-rangeSlider',
    'ui.tree',
    'angular-jqcloud',
    'slick',
    'angular-loading-bar',
    'ui.date',
    'ui.select2',
    'angularytics'
  ])
  .config(['$routeProvider', '$facebookProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $facebookProvider, $locationProvider, $httpProvider) {
	
	var access = routingConfig.accessLevels;
	//console.log(access);
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
        access:      access.anon
	  })
      .when('/mobile-verify', {
        templateUrl: 'views/mobile-verify.html',
        controller: 'MobileVerifyCtrl'
        
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        access:      access.public
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        access:      access.user
      })
      .when('/profile_comments', {
        templateUrl: 'views/profile_comments.html',
        controller: 'ProfileCommentsCtrl',
        access:      access.user
      })
      .when('/side_menu', {
        templateUrl: 'views/side_menu.html',
        controller: 'SideMenuCtrl',
        access:      access.user
      })
      .when('/side_bar', {
        templateUrl: 'views/side_bar.html',
        controller: 'SideBarCtrl',
        access:      access.user
      })
      .when('/discussion-list', {
        templateUrl: 'views/discussion-list.html',
        controller: 'DiscussionListCtrl',
        access:      access.user
      })
      .when('/discussion-topics', {
        templateUrl: 'views/discussion-topics.html',
        controller: 'DiscussionTopicsCtrl',
        access:      access.user
      })
      .when('/discussion', {
        templateUrl: 'views/discussion.html',
        controller: 'DiscussionCtrl',
        access:      access.user
      })
      .when('/admin-add-discussion', {
        templateUrl: 'views/admin-add-discussion.html',
        controller: 'AdminAddDiscussionCtrl',
        access:      access.admin
      })
      .when('/admin-discussion-list', {
        templateUrl: 'views/admin-discussion-list.html',
        controller: 'AdminDiscussionListCtrl',
        access:      access.admin
      })
      .when('/admin-topic-list', {
        templateUrl: 'views/admin-topic-list.html',
        controller: 'AdminTopicListCtrl',
        access:      access.admin
      })
      .when('/admin-add-topic', {
        templateUrl: 'views/admin-add-topic.html',
        controller: 'AdminAddTopicCtrl',
        access:      access.admin
      })
      .when('/admin-topic-view', {
        templateUrl: 'views/admin-topic-view.html',
        controller: 'AdminTopicViewCtrl',
        access:      access.admin
      })
      .when('/add-topic', {
        templateUrl: 'views/add-topic.html',
        controller: 'AddTopicCtrl',
        access:      access.user
      })
      .when('/admin-discussion-edit', {
        templateUrl: 'views/admin-discussion-edit.html',
        controller: 'AdminDiscussionEditCtrl',
        access:      access.admin
      })
	     .when('/admin-discussionboardAbuse-list', {
        templateUrl: 'views/admin-discussionboardabuse-list.html',
        controller: 'AdminDiscussionboardabuseListCtrl',
        access:      access.admin
      })
      .when('/edit-profile', {
        templateUrl: 'views/edit-profile.html',
        controller: 'EditProfileCtrl',
        access:      access.user
      })
      .when('/add-forum', {
        templateUrl: 'views/add-forum.html',
        controller: 'AddForumCtrl',
        access:      access.user
      })
      .when('/edit-forum', {
        templateUrl: 'views/edit-forum.html',
        controller: 'EditForumCtrl',
        access:      access.user
      })
      .when('/dashboard-anon', {
        templateUrl: 'views/dashboard-anon.html',
        controller: 'DashboardAnonCtrl'
      })
      .when('/side_bar_anon', {
        templateUrl: 'views/side_bar_anon.html',
        controller: 'SideBarAnonCtrl'
      })
      .when('/admin-bad-list', {
        templateUrl: 'views/admin-bad-list.html',
        controller: 'AdminBadListCtrl',
        access:      access.admin
      })      
      .when('/admin-inappropriate-comments', {
        templateUrl: 'views/admin-inappropriate-comments.html',
        controller: 'AdminInappropriateCommentsCtrl',
        access:      access.admin
      })
      .when('/superadmin-profile', {
        templateUrl: 'views/superadmin-profile.html',
        controller: 'SuperadminProfileCtrl',
        access:      access.admin
      })
      .when('/side-bar-superadmin', {
        templateUrl: 'views/side-bar-superadmin.html',
        controller: 'SideBarSuperadminCtrl',
        access:      access.admin
      })
      .when('/superadmin-message', {
        templateUrl: 'views/superadmin-message.html',
        controller: 'SuperadminMessageCtrl',
        access:      access.admin
      })
      .when('/superadmin-blockuser', {
        templateUrl: 'views/superadmin-blockuser.html',
        controller: 'SuperadminBlockuserCtrl',
        access:      access.admin
      })
      .when('/superadmin-admin', {
        templateUrl: 'views/superadmin-admin.html',
        controller: 'SuperadminAdminCtrl',
        access:      access.admin
      })
      .when('/superadmin-add-admin', {
        templateUrl: 'views/superadmin-add-admin.html',
        controller: 'SuperadminAddAdminCtrl',
        access:      access.admin
      })
      .when('/confirmGTKY', {
        templateUrl: 'views/confirmgtky.html',
        controller: 'ConfirmgtkyCtrl',
        access:      access.user
      })
      .when('/report-abuse-user', {
        templateUrl: 'views/report-abuse-user.html',
        controller: 'ReportAbuseUserCtrl',
        access:      access.user
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        access:      access.public
      })
      .when('/admin-userlist', {
        templateUrl: 'views/admin-userlist.html',
        controller: 'AdminUserlistCtrl',
        access:      access.admin
      })
      .when('/admin-blocked-users', {
        templateUrl: 'views/admin-blocked-users.html',
        controller: 'AdminBlockedUsersCtrl',
        access:      access.admin
      })
      .when('/accept-gtky', {
        templateUrl: 'views/accept-gtky.html',
        controller: 'AcceptGtkyCtrl',
        access:      access.user
      })
       .when('/my-messages', {
        templateUrl: 'views/my-messages.html',
        controller: 'MyMessagesCtrl',
        access:      access.user
      })
      .when('/reply-message', {
        templateUrl: 'views/reply-message.html',
        controller: 'ReplyMessageCtrl',
        access:      access.user
      })
      .when('/ad-discussion-list', {
        templateUrl: 'views/ad-discussion-list.html',
        controller: 'AdDiscussionListCtrl',
        access:      access.admin
      })
      .when('/admin-edit', {
        templateUrl: 'views/admin-edit.html',
        controller: 'AdminEditCtrl',
        access:      access.admin
      })
      .when('/superadmin-view-user', {
        templateUrl: 'views/superadmin-view-user.html',
        controller: 'SuperadminViewUserCtrl',
        access:      access.admin
      })
      .when('/admin-add-question', {
        templateUrl: 'views/admin-add-question.html',
        controller: 'AdminAddQuestionCtrl',
        access:      access.admin
      })
      .when('/admin-add-message', {
        templateUrl: 'views/admin-add-message.html',
        controller: 'AdminAddMessageCtrl',
        access:      access.admin
      })
      .when('/system-messages', {
        templateUrl: 'views/system-messages.html',
        controller: 'SystemMessagesCtrl',
        access:      access.user
      })
      .when('/quiz', {
        templateUrl: 'views/quiz.html',
        controller: 'QuizCtrl',
        access:      access.user
      })
	  .when('/admin-list-question', {
        templateUrl: 'views/admin-list-question.html',
        controller: 'AdminListQuestionCtrl'
      })
	  .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        access:      access.user
      })
      .when('/header1', {
        templateUrl: 'views/header1.html',
        controller: 'Header1Ctrl'
      })
      .when('/left-bar', {
        templateUrl: 'views/left-bar.html',
        controller: 'LeftBarCtrl'
      })
      .when('/myprofile', {
        templateUrl: 'views/myprofile.html',
        controller: 'MyprofileCtrl',
        access:      access.user
      })
      .when('/admin-edit-question', {
        templateUrl: 'views/admin-edit-question.html',
        controller: 'AdminEditQuestionCtrl'
      })
      .when('/otherprofile', {
        templateUrl: 'views/otherprofile.html',
        controller: 'OtherprofileCtrl',
        access:      access.user
      })
      .when('/left-barP', {
        templateUrl: 'views/left-barp.html',
        controller: 'LeftBarpCtrl',
        access:      access.user
      })
      .when('/question-list', {
        templateUrl: 'views/question-list.html',
        controller: 'QuestionListCtrl'
      })
      .when('/question-edit', {
        templateUrl: 'views/question-edit.html',
        controller: 'QuestionEditCtrl',
        access:      access.user
      })
      .when('/admin-manage-question', {
        templateUrl: 'views/admin-manage-question.html',
        controller: 'AdminManageQuestionCtrl'
      })
      .when('/admin-personality-matrix', {
        templateUrl: 'views/admin-personality-matrix.html',
        controller: 'AdminPersonalityMatrixCtrl'
      })
      .when('/edit-profile-new', {
        templateUrl: 'views/edit-profile-new.html',
        controller: 'EditProfileNewCtrl',
        access:      access.user
      })
      .when('/admin-requested-topic', {
        templateUrl: 'views/admin-requested-topic.html',
        controller: 'AdminRequestedTopicCtrl',
        access:      access.admin
      })
      .when('/edit-profile-other', {
        templateUrl: 'views/edit-profile-other.html',
        controller: 'EditProfileOtherCtrl',
        access:      access.user
      })
      .when('/friends', {
        templateUrl: 'views/friends.html',
        controller: 'FriendsCtrl',
        access:      access.user
      })
      .when('/header-signup', {
        templateUrl: 'views/header-signup.html',
        controller: 'HeaderSignupCtrl'
      })
      .when('/leftbar-signup', {
        templateUrl: 'views/leftbar-signup.html',
        controller: 'LeftbarSignupCtrl'
      })
      .when('/leftbar-quiz', {
        templateUrl: 'views/leftbar-quiz.html',
        controller: 'LeftbarQuizCtrl'
      })
      .when('/special-feeling-request', {
        templateUrl: 'views/special-feeling-request.html',
        controller: 'SpecialFeelingRequestCtrl',
        access:      access.user
      })
      .when('/special-feeling-accept', {
        templateUrl: 'views/special-feeling-accept.html',
        controller: 'SpecialFeelingAcceptCtrl',
        access:      access.user
      })
      .when('/special-feeling-history', {
        templateUrl: 'views/special-feeling-history.html',
        controller: 'SpecialFeelingHistoryCtrl',
        access:      access.user
	  })      
	    .when('/page-error', {
        templateUrl: 'views/page-error.html',
        controller: 'PageErrorCtrl',
        access:      access.public
      })
      .when('/admin-restriction', {
        templateUrl: 'views/admin-restriction.html',
        controller: 'AdminRestrictionCtrl',
        access:      access.admin
      })
      .when('/heart-statics', {
        templateUrl: 'views/heart-statics.html',
        controller: 'HeartStaticsCtrl'
      })
      .when('/privacy-policy', {
        templateUrl: 'views/privacy-policy.html',
        controller: 'PrivacyPolicyCtrl'
      })
      .when('/contact-us', {
        templateUrl: 'views/contact-us.html',
        controller: 'ContactUsCtrl'
      })
      .when('/admin-contactus-listing', {
        templateUrl: 'views/admin-contactus-listing.html',
        controller: 'AdminContactusListingCtrl'
      })
      .when('/admin-contactus-detail', {
        templateUrl: 'views/admin-contactus-detail.html',
        controller: 'AdminContactusDetailCtrl'
      })
      .when('/why-join-soulcafe', {
        templateUrl: 'views/why-soul.html',
        controller: 'WhySoulCtrl'
      })
      .when('/about-us', {
        templateUrl: 'views/about-us.html',
        controller: 'AboutUsCtrl'
      })
      .when('/how-soulcafe-works', {
        templateUrl: 'views/how-works.html',
        controller: 'HowWorksCtrl'
      })
      .when('/strictly-not-allowed-on-soulcafe', {
        templateUrl: 'views/strict-no.html',
        controller: 'StrictNoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    
       // $facebookProvider.setAppId('305118313022402'); // for localhost
      // $facebookProvider.setAppId('273647349502832');
       $facebookProvider.setAppId('316788255188741'); //For ip address testing


    
    $facebookProvider.setPermissions("email,user_likes,user_birthday,user_relationships,user_work_history,user_hometown,user_location,user_friends");
    
//    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
//        return {
//            'responseError': function(response) {
//                if(response.status === 401 || response.status === 403) {
//                	localStorageService.clearAll();
//                    //$location.path('/');
//                    return $q.reject(response);
//                }
//                else {
//                    return $q.reject(response);
//                }
//            }
//        }
//    });
  }]);

angular.module('sassApp').run( function($rootScope, $location, $http, regService, localStorageService) {
	  // Load the facebook SDK asynchronously
	var authData = localStorageService.get('user');
	//console.log(authData);
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
        //console.log(next.access);
        //console.log(next);
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

angular.module('sassApp').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');

    //Initialise get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);
 angular.module('sassApp').config(function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  });
 angular.module('sassApp').run(function(Angularytics) {
    Angularytics.init();
  });