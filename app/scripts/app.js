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
    'linkedinServices'
  ])
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });
