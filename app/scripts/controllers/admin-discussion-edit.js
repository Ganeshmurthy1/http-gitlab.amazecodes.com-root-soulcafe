'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminDiscussionEditCtrl
 * @description
 * # AdminDiscussionEditCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminDiscussionEditCtrl', function ($scope, adminDiscussion,localStorageService, $routeParams, $location, config,FileUploader) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

// $scope.discussId = $routeParams.discussId;
// console.log($scope.discussId);

var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

adminDiscussion.getdiscussionTopicDetail($routeParams.discussId).then(function (response) {
	    		console.log(response);
	    		$scope.discussion = response.data;
	    		$scope.discussion.discussId = $routeParams.discussId;
	    		console.log($scope.discussion.RestrictedAge);
	    		if ($scope.discussion.Restricted == 1){   
	    		$scope.discussion.Restricted = true;
	    		}
	    		$scope.value=parseInt($scope.discussion.RestrictedAge);
	    		
	    	});


$scope.adminEditDiscussion = function() {
	
 
  $scope.discussion.Image =  $scope.image;
   // console.log($scope.discussion.Image );
  $scope.discussion.RestrictedAge = $scope.value;
  if ($scope.discussion.Restricted == true){
  	$scope.discussion.Restricted = 1;
  } else{
  	$scope.discussion.Restricted = 0;
  }
console.log($scope.discussion);
	adminDiscussion.updatediscussionTopicDetail($scope.discussion).then(function (response) {
	    		console.log(response);
	    		if(response.data == "true"){
	    			$location.path('/admin-topic-list');
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
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            $scope.image=response.filename;
            console.log( $scope.image);
            console.log(status);
            console.log(headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            alert("Image Uploaded.");
        };

        console.info('uploader', uploader);
  });
