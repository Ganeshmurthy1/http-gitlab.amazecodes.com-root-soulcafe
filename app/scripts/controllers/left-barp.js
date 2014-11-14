'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftBarpCtrl
 * @description
 * # LeftBarpCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftBarpCtrl', function ($scope, localStorageService, $routeParams,regService,profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     $scope.LeftBarOther = 'views/left-barp.html';

     


     $scope.thumbup='true';
     $scope.user_id = $routeParams.user_id;
     console.log( $scope.user_id);

     profileOperations.getforumsOther($scope.user_id).then(function(response) {
      
      console.log(response);    
         $scope.discussion=response.data;
          console.log($scope.discussion);        
     });

    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails($scope.user_id).then(function (results) {
        //console.log(results.data);
       
        $scope.userData = results.data; 
         var d1 = new Date($scope.userData.birthdate);
	    	var d2 = new Date();
			$scope.diff = d2.getFullYear()-d1.getFullYear();
			console.log($scope.diff);
        // console.log($scope.userData.Picture);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });
  });
