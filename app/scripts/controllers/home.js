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

     regService.getRecomendations().then(function (results) {
        console.log(results.data);

        for (var i = 1; i >= results.data.length; i++) {
          console.log(results.data.length);
            // if(i=4){
            //   $scope.imageobj.image1=results.data[i].Picture;
            //   $scope.imageobj.image1=results.data[i+1].Picture;
            //   $scope.imageobj.image1=results.data[i+2].Picture;
            //   $scope.imageobj.image1=results.data[+3].Picture;
            // }
            // if(i=4 && i<8 ){
            //   $scope.imageobj.image1=results.data[0].Picture;
            //   $scope.imageobj.image1=results.data[0+1].Picture;
            //   $scope.imageobj.image1=results.data[0+2].Picture;
            //   $scope.imageobj.image1=results.data[0+3].Picture;
            // }

           };

        
      });



    $scope.thumbup = 'true';
    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails(authData.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data; 
        console.log($scope.userData);
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
      

      $scope.otherProfile = function(userId){
      regService.getUserDetails(userId).then(function (results) {
        $scope.userD = results.data; 
        console.log($scope.userD);
         if ($scope.userD.status == 0) {
          alert("Your profile is deactive. Please contact Customer care.");
        }else{
          $location.url("/otherprofile?user_id="+userId);
        }
      });
        
        
      }

      // #/otherprofile?user_id={{rec.user_id}}

   }]);