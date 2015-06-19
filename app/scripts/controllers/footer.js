'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('FooterCtrl', function ($scope) {

$scope.Footer = 'views/footer.html';


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
