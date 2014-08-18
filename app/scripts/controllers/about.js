'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
