'use strict';

/**
 * @ngdoc service
 * @name sassApp.Questionnaire
 * @description
 * # Questionnaire
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('Questionnaire', ['Transporter', function(Transporter) {
	    var dataFactory = {};
	    
	    dataFactory.getAllQuestionCategory = function () {
	    	// console.log(param);
	    	return Transporter.get('alg_get_category').then(function(response) {
	    		//console.log(response);
              return response;
          });	    	
	    };
	    
	    dataFactory.getAllQuestionType = function () {
	    	// console.log(param);
	    	return Transporter.get('alg_get_type').then(function(response) {
	    		//console.log(response);
              return response;
          });	    	
	    };
	    return dataFactory;
}]);
