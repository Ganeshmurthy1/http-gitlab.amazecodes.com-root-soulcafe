'use strict';

/**
 * @ngdoc service
 * @name sassApp.messageCodes
 * @description
 * # messageCodes
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('messageCodes', function () {
    // Service logic
    // ...

	  var dataFactory = {};

//	  dataFactory.Messages = {
//	  '100':'You are now friends',
//	    
//	  };
	  dataFactory.Messages = [];
	  dataFactory.Messages['100'] = {'msg': 'You are now friends', 'type': 'success'};
	  dataFactory.Messages['101'] = {'msg': 'Some error', 'type': 'danger'};
	  
	  
			 

	  return dataFactory;
  });
