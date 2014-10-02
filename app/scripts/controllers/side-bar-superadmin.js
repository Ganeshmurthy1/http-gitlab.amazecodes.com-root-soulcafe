'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarSuperadminCtrl
 * @description
 * # SideBarSuperadminCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarSuperadminCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.SideBarSuperAdmin = 'views/side-bar-superadmin.html';
  });
