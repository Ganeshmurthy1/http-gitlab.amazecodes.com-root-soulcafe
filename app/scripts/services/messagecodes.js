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
	  dataFactory.Messages['102'] = {'msg': 'Message passed on! Cheers!', 'type': 'success'};
	  dataFactory.Messages['103'] = {'msg': 'Your response of brewing request is sent!!!! ', 'type': 'success'};
	  dataFactory.Messages['104'] = {'msg': 'You rejected the friend request!!!!	 ', 'type': 'danger'};
	  dataFactory.Messages['105'] = {'msg': 'This profile is currently deactivated in SoulCafe!!!!', 'type': 'danger'};
	  dataFactory.Messages['106'] = {'msg': 'We hate coffee stains.  Thanks for letting us know, we\'ll clean the mess! ', 'type': 'success'};
	  dataFactory.Messages['107'] = {'msg': 'Woo Hoo! Your message has been speed posted.', 'type': 'success'};
	  dataFactory.Messages['108'] = {'msg': 'Now you are friends!!!!	 ', 'type': 'success'}; 
	  dataFactory.Messages['109'] = {'msg': 'Your request is already sent!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['110'] = {'msg': 'A quick review & we will get this added on our Café Menu!', 'type': 'success'};
	  dataFactory.Messages['111'] = {'msg': 'Oh we love the aroma of conversations at our café. A quick review and this will be posted.', 'type': 'success'};
	  dataFactory.Messages['112'] = {'msg': 'We sniff some not so okay words in your comment. This will be posted only after moderation.', 'type': 'danger'};
	  dataFactory.Messages['113'] = {'msg': 'We hate coffee stains.  Thanks for letting us know, we\'ll clean the mess! ', 'type': 'success'};
	  dataFactory.Messages['114'] = {'msg': 'Profile updated sucessfully!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['115'] = {'msg': 'Thank You for reaching out. We will respond to you soon!!!!	 ', 'type': 'success'};
	  dataFactory.Messages['116'] = {'msg': 'Sorry, we are yet to find a match for you. Please be part of the conversations groups and make sure your profile information is complete. We will have the right recommendations for you soon.	 ', 'type': 'danger'};
	  dataFactory.Messages['117'] = {'msg': 'Saved! Thank you for being you!', 'type': 'sucess'};
	  dataFactory.Messages['118'] = {'msg': 'We haven\'t got your required facebook data for our validation. OOpsie! Please remove "SoulCafe" app under your Facebook app list and try Signing up once again. Grant permission to access your required data for our validation.You can always reach out to us using "Your Feedback" option and we will be happy to guide you through.', 'type': 'danger'};
			
 
	  return dataFactory;
  });
