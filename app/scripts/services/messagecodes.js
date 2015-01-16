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
	  dataFactory.Messages['102'] = {'msg': 'Your brewing request is sent!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['103'] = {'msg': 'Your response of brewing request is sent!!!! ', 'type': 'success'};
	  dataFactory.Messages['104'] = {'msg': 'You rejected the friend request!!!!	 ', 'type': 'danger'};
	  dataFactory.Messages['105'] = {'msg': 'This profile is currently deactivated in SoulCafe!!!!', 'type': 'danger'};
	  dataFactory.Messages['106'] = {'msg': 'Thank You. We will take Necessary action!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['107'] = {'msg': 'Thank You. We have Send the request!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['108'] = {'msg': 'Now you are friends!!!!	 ', 'type': 'success'}; 
	  dataFactory.Messages['109'] = {'msg': 'Your request is already sent!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['110'] = {'msg': 'The Forum will be posted soon after review!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['111'] = {'msg': 'The Topic will be posted soon after review!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['112'] = {'msg': 'Your comment will be posted only after moderation!!!!	 ', 'type': 'danger'};
	  dataFactory.Messages['113'] = {'msg': 'You reported comment as Spam!!!!	 ', 'type': 'success'};
	   dataFactory.Messages['114'] = {'msg': 'Profile updated sucessfully!!!!	 ', 'type': 'success'};
	  
		
 
	  return dataFactory;
  });
