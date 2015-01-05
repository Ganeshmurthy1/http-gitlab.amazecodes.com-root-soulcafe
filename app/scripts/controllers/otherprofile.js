'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:OtherprofileCtrl
 * @description
 * # OtherprofileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('OtherprofileCtrl', ['$scope','$location','$rootScope','localStorageService','regService', 'FlickrApi','$routeParams','profileOperations', '$facebook', '$modal','messageCodes', function ($scope, $location, $rootScope, localStorageService, regService,flickr,$routeParams,profileOperations, $facebook, $modal,messageCodes) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var abs = $routeParams.abm;
    if(abs != undefined) {
    	$scope.repotabuseMessage = true;
    }
    
    $scope.q = '';
    var q = $routeParams.q;
    if (q != null) {
      console.log(messageCodes.Messages[q]);
      $scope.q = messageCodes.Messages[q];
  }
    
    $scope.thumbup = 'true';
    $scope.user_id = $routeParams.user_id;
    $scope.msg = $routeParams.msg;
    $scope.already = $routeParams.already;
    $scope.accept = $routeParams.accept;
    $scope.profileverify = '75%';
    var authData = localStorageService.get('authorizationData');
    $scope.udata = authData;
    if($scope.user_id == authData.user_id) {
    	$location.path('/myprofile');
    }
    
    
    
    // console.log($scope.udata.user_id);
    profileOperations.getMyLifeValues($scope.user_id).then(function(response) {
      console.log(response.data);
      $scope.interests = response.data;
      // console.log($scope.interest);
     });

      regService.getUserDetails($scope.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data;
        $scope.matchSex = false;
        if ($scope.userData.gender == $scope.udata.Gender) {
			$scope.matchSex = true;
		}
        
        var d1 = new Date($scope.userData.birthdate);
        var d2 = new Date();
        $scope.diff = d2.getFullYear()-d1.getFullYear();
        
//      if ($scope.userData.linked_update == 1){
//      $scope.thumbup = 'false';
//      $scope.profileverify = '75%';
//      // console.log("Abhik");
//    }else{
//      $scope.thumbup = 'true';
//    }
        var id= $scope.userData.fb_id;
        //console.log(id);
        var likeData = [];
	    $facebook.api(id +"/books").then(function(pic) {
	      
	      if (pic.data == null) {
	        //var likeData = [];
	      }else {
	        //var likeData = [];
		      for ( var int = 0; int < pic.data.length; int++) {
		    	//if (pic.data[int].category == 'Book' || pic.data[int].category == 'Movie' || pic.data[int].category == 'Musician/band' || pic.data[int].category == 'Tv show') {
			        var tmpdata = {};
			        tmpdata.text = pic.data[int].name;
			        tmpdata.weight = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
			        likeData.push(tmpdata);
		    	//}
		      }
	      }
	    });
	      $facebook.api(id +"/movies").then(function(pic) {
	    	  //console.log(pic.data);
	    	  if (pic.data != null) {
		    	  for ( var int = 0; int < pic.data.length; int++) {
		  	    	//if (pic.data[int].category == 'Book' || pic.data[int].category == 'Movie' || pic.data[int].category == 'Musician/band' || pic.data[int].category == 'Tv show') {
		  		        var tmpdata = {};
		  		        tmpdata.text = pic.data[int].name;
		  		        tmpdata.weight = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
		  		        likeData.push(tmpdata);
		  	    	//}
		  	      }
	    	  }
	    	  
	      });
	      
	      $facebook.api(id +"/music").then(function(pic) {
	    	  //console.log(pic.data);
	    	  if (pic.data != null) {
		    	  for ( var int = 0; int < pic.data.length; int++) {
		  	    	//if (pic.data[int].category == 'Book' || pic.data[int].category == 'Movie' || pic.data[int].category == 'Musician/band' || pic.data[int].category == 'Tv show') {
		  		        var tmpdata = {};
		  		        tmpdata.text = pic.data[int].name;
		  		        tmpdata.weight = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
		  		        likeData.push(tmpdata);
		  	    	//}
		  	      }
	    	  }
	    	  
	      });
	      
	      $facebook.api(id +"/likes").then(function(pic) {
	    	  //console.log(pic.data);
	    	  if (pic.data != null) {
		    	  for ( var int = 0; int < pic.data.length; int++) {
		  	    	//if (pic.data[int].category == 'Book' || pic.data[int].category == 'Movie' || pic.data[int].category == 'Musician/band' || pic.data[int].category == 'Tv show') {
		  		        var tmpdata = {};
		  		        tmpdata.text = pic.data[int].name;
		  		        tmpdata.weight = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
		  		        likeData.push(tmpdata);
		  	    	//}
		  	      }
	    	  }
	    	  
	      });
	      
	     // $scope.colors = ["#ccc", "#00ff00", "#ff0000", "#0000ff", "#0000ff", "#0000ff", "#ff0000"];
	
	     
	      
	   
	    $scope.words = likeData;
	    
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '100%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });


     
      
      
      $scope.sendGTKY = function(){
              
      $location.path('/confirmGTKY');
      };
      $scope.acceptGTKY = function(){
              
      $location.path('/accept-gtky');
      };


        profileOperations.checkGTKYRequest($scope.user_id).then(function(resp) {
          //console.log(resp.data);
          $scope.chkuser = resp.data;
          if ($scope.chkuser == 'Say Hello'){
            //console.log("Say Hello");
            $scope.GTKY ="true";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="false";
            $scope.GTKY3 ="false";
          }else if($scope.chkuser == 'GTKY Send'){
            //console.log("GTKY Send");
            $scope.GTKY ="false";
            $scope.GTKY1 ="true";
            $scope.GTKY2 ="false";
            $scope.GTKY3 ="false";
          }else if($scope.chkuser == 'Send Message'){
            //console.log("Send Message");
            $scope.GTKY ="false";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="true";
            $scope.GTKY3 ="false";
          }else if ($scope.chkuser == 'Accept GTKY') {
            //console.log("Accept GTKY");
            $scope.GTKY ="false";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="false";
            $scope.GTKY3 ="true";
          }
          //console.log("Outside");      
        });

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrlMatch',
            size: size,
            resolve: {
              items: function () {
                return $scope.userData;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };
}]);

//Please note that $modalInstance represents a modal window (instance) dependency.
//It is not the same as the $modal service used above.

angular.module('sassApp').controller('ModalInstanceCtrlMatch', function ($scope, $modalInstance, items, profileOperations) {
	

	 profileOperations.getMyMatch(items.user_id).then(function(resp) {
		 $scope.matchDetails = resp.data;
     
      
     if ($scope.matchDetails.personality_match == 1) {
      $scope.comp = true;
      $scope.same = false;
      $scope.no = false;
      $scope.m1 = "23-4th.png";
     }else if ($scope.matchDetails.personality_match == 2) {
      $scope.comp = false;
      $scope.same = true;
      $scope.no = false;
      $scope.m2 = "22-4th.png";
     }else if ($scope.matchDetails.personality_match == 3) {
      $scope.comp = false;
      $scope.same = false;
      $scope.no = true;
      $scope.m3 = "21-4th.png";
     }
	 });
	
	
	$scope.buddyname =  items.first_name;
	
	$scope.items = items;
	$scope.selected = {
	 item: $scope.items[0]
	};
	
	$scope.ok = function () {
	 $modalInstance.close($scope.selected.item);
	};
	
	$scope.cancel = function () {
	 $modalInstance.dismiss('cancel');
	};
});
