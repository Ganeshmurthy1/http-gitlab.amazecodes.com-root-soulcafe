'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HomeCtrl',['$scope','$location','localStorageService','regService', '$routeParams','profileOperations','$anchorScroll','$modal', '$log', 'messageCodes', function ($scope, $location, localStorageService, regService, $routeParams, profileOperations,$anchorScroll,$modal, $log, messageCodes) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.status = $routeParams.status;
    var d = {"name": "jiby", "age": '345'};

    var ddd = {"name": d, "age": '24'};
    
    var k = 'name';
    
    $scope.q = '';
    var q = $routeParams.q;
    if (q != null) {
    	$scope.q = messageCodes.Messages[q];
	}
    
    $scope.reject = $routeParams.reject;    
    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;
    
     regService.getHomeData().then(function (results) {
    	 $scope.updates=results.data.forum;
       $scope.loginCount = results.data.login[0].LoginCount;
      for (var i = 0; i < $scope.updates.length; i++) {
        var d2 = $scope.updates[i].CreatedDate;
        var d1 = new Date();
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
    		    $scope.recomandation[int] = results.data.matches[int];
    		    $scope.recomandation[int].age = diff;
    		    	
    	 }
    	
    	 $scope.caroselImage=['http://www.chem.uit.no/KJEMI/ghosh.jpg','http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
    	                         'http://media.cirrusmedia.com.au/LW_Media_Library/594partner-profile-pic-An.jpg',
    	                         'http://2.bp.blogspot.com/-dZKdgsUW2y0/Une2h3IIVMI/AAAAAAAAC1o/tqJJFHKzHfY/s640/katrina-kaif-Complete-Profile.jpg','http://4.bp.blogspot.com/--fWusEFYKHg/UT8Wr9TVAlI/AAAAAAAAABY/9_HoTCeoA3c/s1600/url.jpeg']; 
    	  
         
      if ($scope.loginCount == 0) {
        $scope.open(123);
      };
         
     });



    $scope.thumbup = 'true';
    $scope.profileverify = '75%';
    var authData = localStorageService.get('authorizationData');
    if (authData.linked_update == 1){
        $scope.thumbup = 'false';
        $scope.profileverify = '100%';
      }else{
        $scope.thumbup = 'true';
      }

      
      $scope.hide=false;

      $scope.otherProfile = function(userId){
      regService.getUserDetails(userId).then(function (results) {
        $scope.userD = results.data; 
         if ($scope.userD.status == 0) {
            $scope.hide=true;
            $scope.q = '';
              var q = 105;
              if (q != null) {
                console.log(messageCodes.Messages[q]);
                $scope.q = messageCodes.Messages[q];
            }
            $location.hash('msg');
             $anchorScroll();
        }else{
          $location.url("/otherprofile?user_id="+userId);
        }
      });
        
        
      }

      $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (id) {
    var modalInstance = $modal.open({
      templateUrl: 'modalWelcome.html',
      controller: 'modalWelcomeCtrl',
      resolve: {
        items: function () {
          return id;
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

angular.module('sassApp')
.controller('modalWelcomeCtrl', function ($scope, regService, profileOperations, localStorageService, $location, $modalInstance, items, config) {

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {

    profileOperations.updateLogin().then(function(response) {
                    
    });
    $modalInstance.dismiss('cancel');
  };
   
});