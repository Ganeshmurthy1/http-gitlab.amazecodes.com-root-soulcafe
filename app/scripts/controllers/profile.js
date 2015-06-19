'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
