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

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    
    
////    
//    $scope.caroselImage=['http://www.chem.uit.no/KJEMI/ghosh.jpg','http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
//                         'http://media.cirrusmedia.com.au/LW_Media_Library/594partner-profile-pic-An.jpg',
//                         'http://2.bp.blogspot.com/-dZKdgsUW2y0/Une2h3IIVMI/AAAAAAAAC1o/tqJJFHKzHfY/s640/katrina-kaif-Complete-Profile.jpg','http://4.bp.blogspot.com/--fWusEFYKHg/UT8Wr9TVAlI/AAAAAAAAABY/9_HoTCeoA3c/s1600/url.jpeg']; 
//  
    
//     regService.getRecomendations().then(function (results) {
//
//       
//
//        
//      });
    
    //$scope.recomandation=localStorageService.get('recomm');
     regService.getHomeData().then(function (results) {
    	 $scope.updates=results.data.forum;
       //console.log($scope.getForumUpdates);
       for (var i = 0; i < $scope.updates.length; i++) {
        var d2 = $scope.updates[i].CreatedDate;
       var d1 = new Date();
       //console.log(d1);
        var dt=new Date(d2.replace(/-/g, '/'));
       
       $scope.updates[i].CreatedDate =timeSince(dt);
        };

     function timeSince(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return interval + ' ' + intervalType;
};
    	 var tt = {};
    	 $scope.recomandation = [];
    	 for ( var int = 0; int < results.data.matches.length; int++) {
    		 	var d1 = new Date(results.data.matches[int].birthdate);
    		    var d2 = new Date();
    		    var diff = d2.getFullYear()-d1.getFullYear();
    		    //$tt = 
    		    $scope.recomandation[int] = results.data.matches[int];
    		    $scope.recomandation[int].age = diff;
    		    	
    	 }
    	// console.log($scope.recomandation);
    	 //$scope.recomandation=results.data.matches;
    	 //localStorageService.set('recomm', results.data.matches);
    	 $scope.caroselImage=['http://www.chem.uit.no/KJEMI/ghosh.jpg','http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
    	                         'http://media.cirrusmedia.com.au/LW_Media_Library/594partner-profile-pic-An.jpg',
    	                         'http://2.bp.blogspot.com/-dZKdgsUW2y0/Une2h3IIVMI/AAAAAAAAC1o/tqJJFHKzHfY/s640/katrina-kaif-Complete-Profile.jpg','http://4.bp.blogspot.com/--fWusEFYKHg/UT8Wr9TVAlI/AAAAAAAAABY/9_HoTCeoA3c/s1600/url.jpeg']; 
    	  
         

         
     });



    $scope.thumbup = 'true';
    $scope.profileverify = '75%';
    var authData = localStorageService.get('authorizationData');
    //console.log(authData.linked_update);
    if (authData.linked_update == 1){
        $scope.thumbup = 'false';
        $scope.profileverify = '100%';
         // console.log("1");
      }else{
        // console.log("1");
        $scope.thumbup = 'true';
      }
//      regService.getUserDetails(authData.user_id).then(function (results) {
//        //console.log(results.data);
//        $scope.userData = results.data; 
//        console.log($scope.userData);
//         if ($scope.userData.linked_update == 1){
//           $scope.thumbup = 'false';
//           $scope.profileverify = '75%';
//           // console.log("Abhik");
//         }else{
//           $scope.thumbup = 'true';
//         }
//      });


//      profileOperations.getUserMatch().then(function(response) {
//      
//      console.log(response);    
//         $scope.recommendation=response.data;    
//           
//      });

//      profileOperations.getForumUpdates().then(function(response) {
//      
//      console.log(response);    
//         $scope.updates=response.data;         
//      });
      

      $scope.otherProfile = function(userId){
      regService.getUserDetails(userId).then(function (results) {
        $scope.userD = results.data; 
        //console.log($scope.userD);
         if ($scope.userD.status == 0) {
          alert("Your profile is deactive. Please contact Customer care.");
        }else{
          $location.url("/otherprofile?user_id="+userId);
        }
      });
        
        
      }

      // #/otherprofile?user_id={{rec.user_id}}

   }]);