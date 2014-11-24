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
		dataFactory.loadThisQuestions = function () {
	    	// console.log(param);
	    	return Transporter.get('get_this_question').then(function(response) {
	    		//console.log(response);
              return response;
          });	    	
	    };
	    
	    dataFactory.addAnswer = function (param) {
	    	// console.log(param);
	    	return Transporter.post('addAnswer', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.getQuestionDetail = function (param) {
	    	// console.log(param);
	    	return Transporter.get('admin_get_question_detail/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.editAdminQuestion = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_edit_question', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.getAllQuestionsUser = function () {	
	      	return Transporter.get('get_all_questions_user').then(function(response) {
	    		//console.log(response);
              return response;
          });	 
	    };
	    dataFactory.loadThisQuestionById = function (param) {
	    	// console.log(param);
	    	return Transporter.get('get_this_question_id/' + param).then(function(response) {
	    		//console.log(response);
              return response;
          });	    	
	    };
	    
	    dataFactory.updateAnswer = function (param) {
	    	// console.log(param);
	    	return Transporter.post('update_answer', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		 dataFactory.getAdminAllQuestionCategory = function () {
		    	// console.log(param);
		    	return Transporter.get('alg_admin_get_category').then(function(response) {
		    		//console.log(response);
	              return response;
	          });	    	
		    };
	    dataFactory.updateQuestionCategorySeq = function (param) {
	    	// console.log(param);
	    	return Transporter.post('update_Question_Category_Seq', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.savePersonality = function (param) {
	    	// console.log(param);
	    	return Transporter.post('save_personality_matrix', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		
		 dataFactory.getPersonalityMatrix = function () {
	    	// console.log(param);
	    	return Transporter.get('admin_get_personality_matrix').then(function(response) {
	    		//console.log(response);
              return response;
          });	    	
	    };
	    return dataFactory;
}]);
