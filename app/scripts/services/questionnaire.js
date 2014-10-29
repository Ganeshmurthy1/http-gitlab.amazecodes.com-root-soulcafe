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
	    dataFactory.getAllAlgorithamType = function () {
	    	// console.log(param);
	    	return Transporter.get('alg_get_algoritham_type').then(function(response) {
	    		//console.log(response);
              return response;
          });	    	
	    };
	    
	    dataFactory.addAdminQuestion = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_add_question', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
	    return dataFactory;
}]);
