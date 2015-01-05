'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminManageQuestionCtrl
 * @description
 * # AdminManageQuestionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminManageQuestionCtrl', function ($scope, Questionnaire) {
	    $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  getAllQuestionCategory();
  function getAllQuestionCategory(){
	  Questionnaire.getAdminAllQuestionCategory().then(function (response) {
			$scope.admins = response.data;
	});
  }

  $scope.sequence = function(category){
    Questionnaire.updateQuestionCategorySeq(category).then(function (response) {
  });
  }

});

