'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LinkedinDashboardCtrl
 * @description
 * # LinkedinDashboardCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LinkedinDashboardCtrl', function ($scope, $rootScope, linkedinService, regService,$location, localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   $scope.id={};
   var uid = new Object();
    var authData = localStorageService.get('authorizationData');
       uid.user_id = authData.user_id;
       $scope.id = uid;

	  $scope.firstName = $rootScope.firstName;
    $scope.lastName = $rootScope.lastName;
    $scope.profilePic = $rootScope.profilePic;
  
    if($rootScope.educations != undefined) {
      var totalEdu = $rootScope.educations._total;
      $scope.education = {};
      var edu = new Object();
      var authData = localStorageService.get('authorizationData');
        console.log(authData);
        //param.user_id = authData.user_id;
      for (var i = 0 ; i < totalEdu; i++) {
        edu.schoolName = $rootScope.educations.values[i].schoolName;
        edu.fieldOfStudy = $rootScope.educations.values[i].fieldOfStudy;
        if ($rootScope.educations.values[i].endDate != undefined){
          edu.endDate = $rootScope.educations.values[i].endDate.year;
        }
        if ($rootScope.educations.values[i].startDate != undefined){
          edu.startDate = $rootScope.educations.values[i].startDate.year;
        }
        edu.user_id = authData.user_id;
        $scope.education[i] = edu;
        edu = {};
      }
    }  

    if($rootScope.phoneNumbers != undefined) {
      var totalNumbers = $rootScope.phoneNumbers._total;
       $scope.contact = {};
      var phn = new Object();
      for (var i = 0 ; i < totalNumbers; i++) {
        phn.phoneNumber = $rootScope.phoneNumbers.values[i].phoneNumber;
        phn.phoneType = $rootScope.phoneNumbers.values[i].phoneType;
        var authData = localStorageService.get('authorizationData');
        phn.user_id = authData.user_id;
        $scope.contact[i] = phn;
        phn = {};
      } 
    }  
     
    if( $rootScope.threeCurrentPositions != undefined) {
      var totalCurrent = $rootScope.threeCurrentPositions._total;
       $scope.currentPosition={};
      var threeCurrent = new Object();
      for (var i = 0 ; i < totalCurrent; i++) {
        threeCurrent.company = $rootScope.threeCurrentPositions.values[i].company.name;
        if ($rootScope.threeCurrentPositions.values[i].startDate != undefined){
          threeCurrent.month = $rootScope.threeCurrentPositions.values[i].startDate.month;
          threeCurrent.year = $rootScope.threeCurrentPositions.values[i].startDate.year;
        }
        threeCurrent.title = $rootScope.threeCurrentPositions.values[i].title;
         var authData = localStorageService.get('authorizationData');
        threeCurrent.user_id = authData.user_id;
        $scope.currentPosition[i] = threeCurrent;
        threeCurrent = {};
      }
    }  
     
    if( $rootScope.threePastPositions != undefined) {
       var totalPast = $rootScope.threePastPositions._total;
     $scope.pastPosition={};
      var threePast = new Object();
      for (var i = 0 ; i < totalPast; i++) {
        threePast.company = $rootScope.threePastPositions.values[i].company.name;
        if ($rootScope.threePastPositions.values[i].startDate != undefined){
          threePast.smonth = $rootScope.threePastPositions.values[i].startDate.month;
          threePast.syear = $rootScope.threePastPositions.values[i].startDate.year;
        }
        if ($rootScope.threePastPositions.values[i].endDate != undefined){
          threePast.emonth = $rootScope.threePastPositions.values[i].endDate.month;
          threePast.eyear = $rootScope.threePastPositions.values[i].endDate.year;
        }
        threePast.title = $rootScope.threePastPositions.values[i].title;
        var authData = localStorageService.get('authorizationData');
        threePast.user_id = authData.user_id;
        $scope.pastPosition[i] = threePast;
        threePast = {};
      }
    }  
     console.log($scope.education);
    console.log(angular.isObject($scope.education));

    if (Object.getOwnPropertyNames($scope.education).length != 0){
      console.log("Abhuikkkkkkkkkkk");
    }

    $scope.addData = function() {
      console.log("Abhuikkkkkkkkkkk");
      if (Object.getOwnPropertyNames($scope.education).length != 0){
        console.log("Abhuikkkkkkkkkkk");
        regService.addEducationData($scope.education).then(function(response) {
          // console.log(response.data);
          if (response.data == 'true') {
            console.log('success'); 
            // $location.path('/linkedin-success');
          }
          else {
            console.log('failed');
          }
        });
      }

      if (Object.getOwnPropertyNames($scope.contact).length != 0){
        regService.addContactData($scope.contact).then(function(response) {
          // console.log(response.data);
          if (response.data == 'true') {
            console.log('success'); 
             // $location.path('/linkedin-success');
          }
          else {
            console.log('failed');
          }
        });
      }

      if (Object.getOwnPropertyNames($scope.currentPosition).length != 0){
        regService.addCurrentPositionData($scope.currentPosition).then(function(response) {
          // console.log(response.data);
          if (response.data == 'true') {
            console.log('success');
             // $location.path('/linkedin-success'); 
          }
          else {
            console.log('failed');
          }
        });
      }

      if (Object.getOwnPropertyNames($scope.pastPosition).length != 0){
        regService.addPastPositionData($scope.pastPosition).then(function(response) {
          if (response.data == 'true') {
            console.log('success'); 
             // $location.path('/linkedin-success');
          }
          else {
            console.log('failed');
          }
        });
      }
      regService.updateUser($scope.id).then(function(response) {
          // console.log(response.data);
          if (response.data == 'true') {
            console.log('success'); 
             $location.path('/dashboard');
          }
          else {
            console.log('failed');
          }
        });

    };

    
    $scope.connections = [];

    $scope.getConnections = function(){
      linkedinService.getConnections(function(error, result){
        if(error){
          console.log('error',error);
        }
        else{
          console.log(result);
          $scope.connections = result;
        }

      });
    };



  });
