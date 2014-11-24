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
			console.log(response.data);
			$scope.admins = response.data;
	});
  }

  $scope.sequence = function(category){
    //console.log(a);
    Questionnaire.updateQuestionCategorySeq(category).then(function (response) {
      console.log(response.data);
  });
  }

});

