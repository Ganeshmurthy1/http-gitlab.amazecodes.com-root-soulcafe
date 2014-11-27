'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HomeCtrl',['$scope','$location','localStorageService','regService', '$routeParams','profileOperations', function ($scope, $location, localStorageService, regService, $routeParams, profileOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.test = ['https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/c0.7.200.200/p200x200/10610908_805092252845086_8387047502213134303_n.jpg?oh=bb3fba424ef77348d7071149e83cdf1b&oe=54F5F631&__gda__=1423668902_63bb520a144e19da7b7ded1ad9f6b268',
                     'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/c0.7.200.200/p200x200/10610908_805092252845086_8387047502213134303_n.jpg?oh=bb3fba424ef77348d7071149e83cdf1b&oe=54F5F631&__gda__=1423668902_63bb520a144e19da7b7ded1ad9f6b268',
                     'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/c0.7.200.200/p200x200/10610908_805092252845086_8387047502213134303_n.jpg?oh=bb3fba424ef77348d7071149e83cdf1b&oe=54F5F631&__gda__=1423668902_63bb520a144e19da7b7ded1ad9f6b268'
                     ]

    var $imageobj = {"image4": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
    			  "image2": 'http://www.chem.uit.no/KJEMI/ghosh.jpg',
    			  "image1": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
    			  "image3": 'http://www.chem.uit.no/KJEMI/ghosh.jpg'
    			};
    var $imageobj2 = {"image3": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
			  "image2": 'http://www.chem.uit.no/KJEMI/ghosh.jpg',
			  "image1": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
			  "image4": 'http://www.chem.uit.no/KJEMI/ghosh.jpg'
			};
    var $imageobj3 = {"image2": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
	  "image4": 'http://www.chem.uit.no/KJEMI/ghosh.jpg',
	  "image3": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
	  "image1": 'http://www.chem.uit.no/KJEMI/ghosh.jpg'
	};
    var $imageobj4 = {"image1": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
	  "image2": 'http://www.chem.uit.no/KJEMI/ghosh.jpg',
	  "image3": 'http://www.penguinbooksindia.com/sites/default/files/styles/in_focus_author/public/author/author_picture/Ravinder%20Singh.jpg',
	  "image4": 'http://www.chem.uit.no/KJEMI/ghosh.jpg'
	};
    $scope.test = [$imageobj, $imageobj2, $imageobj3, $imageobj4];
    $scope.thumbup = 'true';

    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails(authData.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data; 
        // console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });


      profileOperations.getUserMatch().then(function(response) {
      
      console.log(response);    
         $scope.recommendation=response.data;         
      });

      profileOperations.getForumUpdates().then(function(response) {
      
      console.log(response);    
         $scope.updates=response.data;         
      });
      



   }]);