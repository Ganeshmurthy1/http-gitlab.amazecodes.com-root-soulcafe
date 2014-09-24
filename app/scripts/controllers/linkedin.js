'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LinkedinCtrl
 * @description
 * # LinkedinCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LinkedinCtrl', function ($scope, $rootScope, $location,linkedinService,localStorageService,regService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
     $scope.getUserProfile = function () {
         
        linkedinService.getProfile(function(err, result){
            if(err){
                console.log('error occured');
            }else{
                console.log('result', result);
                $scope.linkedinData = result;
               regService.addLinkedinDataf($scope.linkedinData).then(function(response) {
                  // console.log(response.data);
                  if (response.data == 'true') {
                    console.log('success'); 
                    $location.path('/dashboard');
                  }
                  else {
                    console.log('failed');
                  }
                });

            }
        });
    };
    
  });
