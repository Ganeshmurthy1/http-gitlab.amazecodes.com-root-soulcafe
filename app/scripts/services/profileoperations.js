'use strict';

/**
 * @ngdoc service
 * @name sassApp.profileOperations
 * @description
 * # profileOperations
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('profileOperations',['Transporter', 'localStorageService', function(Transporter, localStorageService) {
    
    //var urlBase = localStorageService.get('apiContext').base_path;
    var dataFactory = {};

    dataFactory.getUserMatch = function () { 
          return Transporter.get('get_UserMatch').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getBuddies = function () { 
          return Transporter.get('get_Buddies').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getBuddiesAll = function () { 
          return Transporter.get('get_Buddies_All').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getForumUpdates = function () { 
          return Transporter.get('get_ForumUpdates').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getforumsOther = function (id) { 
          return Transporter.get('get_forumsOther/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.addGTKYRequest = function (param) { 
          return Transporter.post('add_GTKYRequest',param).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.checkGTKYRequest = function (id) { 
          return Transporter.get('check_GTKYRequest/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
    dataFactory.addAbuseUser = function (param) { 
          return Transporter.post('add_AbuseUser',param).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
    dataFactory.checkAbuseUser = function (id) { 
          return Transporter.get('check_AbuseUser/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getUserSendedGTKY = function () { 
          return Transporter.get('get_UserSendedGTKY').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.acceptGTKY = function (id) { 
          return Transporter.get('accept_GTKY/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.rejectGTKY = function (id) { 
          return Transporter.get('reject_GTKY/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     
     dataFactory.getMyMatch = function (id) { 
         return Transporter.get('alg_processor_one_one/'+ id).then(function(response) {
         //console.log(response);
               return response;
           });  
    };
     dataFactory.getMyProfileDetails = function () { 
         return Transporter.get('get_MyProfileDetails').then(function(response) {
         //console.log(response);
               return response;
           });  
    };
    dataFactory.getCommentLike = function (id) { 
         return Transporter.get('get_CommentLike/'+ id).then(function(response) {
         //console.log(response);
               return response;
           });  
    };
    dataFactory.getMyLifeValues = function (id) { 
         return Transporter.get('get_MyLifeValues/'+ id).then(function(response) {
         //console.log(response);
               return response;
           });  
    };
    dataFactory.sendFeeling = function (id) {
      console.log(id); 
        return Transporter.post('send_Feeling/'+ id).then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    dataFactory.getFeelings = function () {
      // console.log(id); 
        return Transporter.get('get_Feelings').then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    dataFactory.notSureFeelings = function (id) {
      console.log(id); 
        return Transporter.post('not_SureFeelings/'+ id).then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    dataFactory.notYetFeelings = function (id) {
      console.log(id); 
        return Transporter.post('not_YetFeelings/'+ id).then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    dataFactory.needTimeFeelings = function (id) {
      console.log(id); 
        return Transporter.post('need_TimeFeelings/'+ id).then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    dataFactory.acceptFeeling = function (id) {
      console.log(id); 
        return Transporter.post('accept_Feeling/'+ id).then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    dataFactory.historyFeeling = function () {
        return Transporter.get('history_Feeling').then(function(response) {
         //console.log(response);
          return response;
        });  
    };
    
    dataFactory.checkFeelingStatus = function (id) {
        // console.log(id); 
          return Transporter.get('check_feelings_status/'+id).then(function(response) {
           //console.log(response);
            return response;
          });  
      };
      dataFactory.getMember = function (id) {
        // console.log(id); 
          return Transporter.get('get_Member/'+id).then(function(response) {
           //console.log(response);
            return response;
          });  
      };
      dataFactory.updateLogin = function () {
        // console.log(id); 
          return Transporter.get('update_Login').then(function(response) {
           //console.log(response);
            return response;
          });  
      };
      dataFactory.getLikes = function () {
        // console.log(id); 
          return Transporter.get('get_Likes').then(function(response) {
           //console.log(response);
            return response;
          });  
      };
      dataFactory.insertLikes = function (param) {        
          var args=new Object();
          args.likes = param;
          
          return Transporter.post('insert_Likes',args).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
    return dataFactory;
  }]);
