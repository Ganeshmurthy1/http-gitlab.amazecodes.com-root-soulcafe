'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminListQuestionCtrl
 * @description
 * # AdminListQuestionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminListQuestionCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    getAllQuestion();
    function getAllQuestion(){
	    adminOperations.getAllQuestions().then(function (response) {
				console.log(response.data);
				$scope.admins = response.data;
		});
    }

    $scope.sequence = function(a){
      console.log(a);
    }
  });
