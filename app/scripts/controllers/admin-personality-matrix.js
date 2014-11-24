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
	      //console.log(response.data);
	      var ansTemp = new Object();
	      var answersy = response.data;
	  	//var answersy = ['INFP', 'INFJ', 'INTJ', 'INTP', 'ENFP', 'ENFJ', 'ENTJ', 'ENTP', 'ESFP', 'ESFJ', 'ESTJ', 'ESTP', 'ISFP', 'ISFJ', 'ISTJ', 'ISTP']	
	  	for ( var x = 0; x < answersy.length; x++) {			
	  		//console.log(answersy[x]);
	  		var index = answersy[x].Row + '*' + answersy[x].Col;
 			ansTemp[index] = answersy[x].Value;
	  	}	
	//	console.log(ansTemp);
		$scope.algPersonalityMatch = ansTemp;
	      
	  });
	  
//	var ansTemp = new Object();
//	var answersy = ['INFP', 'INFJ', 'INTJ', 'INTP', 'ENFP', 'ENFJ', 'ENTJ', 'ENTP', 'ESFP', 'ESFJ', 'ESTJ', 'ESTP', 'ISFP', 'ISFJ', 'ISTJ', 'ISTP']	
//	for ( var x = 0; x < answersy.length; x++) {			
//		for ( var y = 0; y < answersy.length; y++) {
//			var index = answersy[x] + '*' + answersy[y];
// 			ansTemp[index] = 0;				
//		}
//	}	
	//console.log(ansTemp);
	//$scope.algPersonalityMatch = ansTemp;
	//$scope.question.algPersonalityMatch = $scope.algPersonalityMatch;
	 
  }
  
  $scope.notSorted = function(obj){
      if (!obj) {
          return [];
      }
      return Object.keys(obj);
  }

  $scope.savePersonality = function(category){
    //console.log(a);
    Questionnaire.savePersonality(category).then(function (response) {
      //console.log(response.data);
     //$location.path('/admin-list-question');
       $route.reload();
    });
  }

});
