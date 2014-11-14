'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:MyprofileCtrl
 * @description
 * # MyprofileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('MyprofileCtrl',['$scope','$location','localStorageService','regService', 'FlickrApi','$routeParams', function ($scope, $location, localStorageService, regService,flickr,$routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    $scope.thumbup = 'true';

    $scope.profileverify = '50%';
    var authData = localStorageService.get('authorizationData');
      regService.getUserDetails(authData.user_id).then(function (results) {
        console.log(results.data);
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
