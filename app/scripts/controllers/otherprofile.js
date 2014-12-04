'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:OtherprofileCtrl
 * @description
 * # OtherprofileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('OtherprofileCtrl', ['$scope','$location','$rootScope','localStorageService','regService', 'FlickrApi','$routeParams','profileOperations', '$facebook', '$modal', function ($scope, $location, $rootScope, localStorageService, regService,flickr,$routeParams,profileOperations, $facebook, $modal) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.thumbup = 'true';
    $scope.user_id = $routeParams.user_id;
    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails($scope.user_id).then(function (results) {
        //console.log(results.data);
        $scope.userData = results.data;
        var id= $scope.userData.fb_id;
        console.log(id);
    $facebook.api(id +"/likes").then(function(pic) {
      console.log(pic.data);
      if (pic.data == null) {
        var likeData = [];
      }else {
        var likeData = [];
      for ( var int = 0; int < pic.data.length; int++) {
        var tmpdata = {};
        tmpdata.text = pic.data[int].name;
        tmpdata.weight = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        likeData.push(tmpdata);
      }
      $scope.words = likeData;
      $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];

      }
      
    });
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';$result
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });


     
      $scope.sendMessage = function(){
              
      $location.path('/reply-message');
      };
      
      $scope.sendGTKY = function(){
              
      $location.path('/confirmGTKY');
      };
      $scope.acceptGTKY = function(){
              
      $location.path('/accept-gtky');
      };


        profileOperations.checkGTKYRequest($scope.user_id).then(function(resp) {
          console.log(resp.data);
          $scope.chkuser = resp.data;
          if ($scope.chkuser == 'Say Hello'){
            console.log("Say Hello");
            $scope.GTKY ="true";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="false";
            $scope.GTKY3 ="false";
          }else if($scope.chkuser == 'GTKY Send'){
            console.log("GTKY Send");
            $scope.GTKY ="false";
            $scope.GTKY1 ="true";
            $scope.GTKY2 ="false";
            $scope.GTKY3 ="false";
          }else if($scope.chkuser == 'Send Message'){
            console.log("Send Message");
            $scope.GTKY ="false";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="true";
            $scope.GTKY3 ="false";
          }else if ($scope.chkuser == 'Accept GTKY') {
            console.log("Accept GTKY");
            $scope.GTKY ="false";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="false";
            $scope.GTKY3 ="true";
          }
          console.log("Outside");      
        });

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
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

angular.module('sassApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, profileOperations) {
	

	 profileOperations.getMyMatch(items.user_id).then(function(resp) {
		 $scope.matchDetails = resp.data;
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
