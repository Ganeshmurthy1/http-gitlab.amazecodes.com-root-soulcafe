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
                
            }else{
                
                $scope.linkedinData = result;
               regService.addLinkedinDataf($scope.linkedinData).then(function(response) {
                  
                  if (response.data == 'true') {
                    
                    $location.path('/dashboard');
                  }
                  else {
                    
                  }
                });

            }
        });
    };
    
  });
