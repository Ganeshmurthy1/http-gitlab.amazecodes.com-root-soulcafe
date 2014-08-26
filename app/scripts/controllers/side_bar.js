'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarCtrl
 * @description
 * # SideBarCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarCtrl', function ($scope) {

$scope.SideBar = 'views/side_bar.html';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
