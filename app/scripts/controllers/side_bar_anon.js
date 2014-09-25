'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarAnonCtrl
 * @description
 * # SideBarAnonCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarAnonCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.SideBarAnon = 'views/side_bar_anon.html';

  });
