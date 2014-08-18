'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LinkedinCtrl
 * @description
 * # LinkedinCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LinkedinCtrl', function ($scope, $rootScope, $location,linkedinService) {
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

                $rootScope.userprofile = result;
                // console.log($rootScope.userprofile);
                $rootScope.firstName = $rootScope.userprofile.values[0].firstName;
                // console.log($rootScope.firstName);
                $rootScope.lastName = $rootScope.userprofile.values[0].lastName;
                // console.log($rootScope.lastName);
                $rootScope.educations = $rootScope.userprofile.values[0].educations;
                console.log($rootScope.educations);
                $rootScope.phoneNumbers = $rootScope.userprofile.values[0].phoneNumbers;
                
                $rootScope.threeCurrentPositions = $rootScope.userprofile.values[0].threeCurrentPositions;
                $rootScope.profilePic = $rootScope.userprofile.values[0].pictureUrl;
                console.log($rootScope.threeCurrentPositions);
                $rootScope.threePastPositions = $rootScope.userprofile.values[0].threePastPositions;
                console.log($rootScope.threePastPositions);
                $location.path("/linkedin-dashboard");
               

            }
        });
    };
    
  });
