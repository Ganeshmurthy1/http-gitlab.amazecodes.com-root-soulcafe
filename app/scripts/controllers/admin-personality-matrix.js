'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminPersonalityMatrixCtrl
 * @description
 * # AdminPersonalityMatrixCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminPersonalityMatrixCtrl', function ($scope, Questionnaire, $location, $route) {
	    $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  getPersonalityMatrix();
  function getPersonalityMatrix(){
	  
	  Questionnaire.getPersonalityMatrix().then(function (response) {
	      var ansTemp = new Object();
	      var answersy = response.data;
	  	for ( var x = 0; x < answersy.length; x++) {			
	  		var index = answersy[x].Row + '*' + answersy[x].Col;
 			  ansTemp[index] = answersy[x].Value;
	  	}	
		$scope.algPersonalityMatch = ansTemp;
	      
	  });

  }
  
  $scope.notSorted = function(obj){
      if (!obj) {
          return [];
      }
      return Object.keys(obj);
  }

  $scope.savePersonality = function(category){
    Questionnaire.savePersonality(category).then(function (response) {
       $route.reload();
    });
  }

});
