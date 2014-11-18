'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:OtherprofileCtrl
 * @description
 * # OtherprofileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('OtherprofileCtrl', ['$scope','$location','localStorageService','regService', 'FlickrApi','$routeParams','profileOperations', function ($scope, $location, localStorageService, regService,flickr,$routeParams,profileOperations) {
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
        // console.log($scope.userData);
         if ($scope.userData.linked_update == 1){
           $scope.thumbup = 'false';
           $scope.profileverify = '75%';
           // console.log("Abhik");
         }else{
           $scope.thumbup = 'true';
         }
      });

      $scope.sendGTKY = function(){
              
      $location.path('/confirmGTKY');
      };

        profileOperations.checkGTKYRequest($scope.user_id).then(function(resp) {
          console.log(resp.data[0]);
          $scope.chkuser = resp.data[0];
          if ($scope.chkuser == null){
            console.log("Abhik Null");
            $scope.GTKY ="true";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="false";
          }else if( $scope.chkuser.Status == 0) {
            console.log("Abhik Status 0");
             $scope.GTKY ="false";
            $scope.GTKY1 ="true";
            $scope.GTKY2 ="false";
          }else if($scope.chkuser.Status == 1){
            console.log("Abhik Status 1");
              $scope.GTKY ="false";
            $scope.GTKY1 ="false";
            $scope.GTKY2 ="true";
          }
          // console.log("Outside");      
        });




 var fill = d3.scale.category20();

  d3.layout.cloud().size([350, 350])
      .words([
        "Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this","Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this","Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this","Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this"].map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
      }))
      .padding(5)
      // .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("#vis").append("svg")
        .attr("width", 350)
        .attr("height", 350)
        .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }

}]);
