'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AcceptGtkyCtrl
 * @description
 * # AcceptGtkyCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AcceptGtkyCtrl', function ($scope,profileOperations,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

profileOperations.getUserSendedGTKY().then(function(response) {
    console.log(response.data);
    $scope.GTKYrequest =  response.data;         
});


$scope.acceptButtonClick=function(id){
  console.log(id);
  profileOperations.acceptGTKY(id).then(function(response) {
      if (response.data = 'true'){
        $location.url("/otherprofile?user_id="+id+"&q=108");
      }      
  });

}

$scope.rejectButtonClick=function(id){
  profileOperations.rejectGTKY(id).then(function(response) {
    if (response.data = 'true'){
      $location.url("/home?q=104");
    }        
  });
}


  });
