'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminAddDiscussionCtrl
 * @description
 * # AdminAddDiscussionCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminAddDiscussionCtrl', ['$scope','$location','adminDiscussion', 'FileUploader', function ($scope, $location, adminDiscussion,FileUploader) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.adminAddDiscussion = function() {
        $scope.discussion.image=$scope.image;
    	adminDiscussion.addDiscussion($scope.discussion).then(function(response) {
		  if (response.data == 'true') {
			  $scope.savedSuccessfully = true;
              $scope.successmessage = "Forum added sucessfully.";
              $scope.errMessage = false;
              $scope.discussion = false;
		  }
		  else {
			  $scope.successmessage = false;
			  $scope.errMessage = response.data;
		  }
       });
    };
    
 var uploader = $scope.uploader = adminDiscussion.setUploader();

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            // console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            // console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            // console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            // console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            // console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            // console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            // console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            // console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            // console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          if (response == 'max_size_exceeded') {
                // console.log('Maximum size is 2 mb');
                $scope.imageErr = 'Maximum image size is 2mb';
            } 
            else if(response.filename != '') {
                // console.info('onCompleteItem', fileItem, response, status, headers);
                $scope.image=response.filename;
                $scope.imageSucc = 'Image got Uploaded, Please save the change.';
                $scope.disable_save = false;
                
            }

            // console.info('onCompleteItem', fileItem, response, status, headers);
            $scope.image=response.filename;
        };
        uploader.onCompleteAll = function() {
        //     console.info('onCompleteAll');
        //     alert("Image Uploaded.");
        };

        // console.info('uploader', uploader);
  }]);