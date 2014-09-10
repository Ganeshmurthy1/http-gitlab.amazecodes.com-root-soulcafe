'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarCtrl
 * @description
 * # SideBarCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarCtrl', function ($scope, localStorageService,regService) {

$scope.SideBar = 'views/side_bar.html';

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isAdmin = false;
    var authData = localStorageService.get('authorizationData');
    if(authData.user_role == 1) {
    	$scope.isAdmin = true;
    }
   
   regService.getPicture().then(function(response) {
            $scope.pic=response.data; 
            // console.log($scope.pic.Picture);
    });
  });
