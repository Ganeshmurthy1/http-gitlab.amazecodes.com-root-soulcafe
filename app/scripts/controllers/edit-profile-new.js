'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:EditProfileNewCtrl
 * @description
 * # EditProfileNewCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('EditProfileNewCtrl', ['$scope','$rootScope','$location','$route','$routeParams','linkedinService','localStorageService','regService','profileOperations','Questionnaire','FileUploader','adminDiscussion','config','$filter', function ($scope, $rootScope, $location, $route, $routeParams, linkedinService, localStorageService, regService,profileOperations,Questionnaire,FileUploader,adminDiscussion,config,$filter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            dateFormat:'yy-mm-dd',
            maxDate: "-22Y"
        };

    var config = localStorageService.get('config');
    $scope.imagepath = config.image_path;

    $scope.exp=$routeParams.exp;
    //console.log($scope.exp);
    if($scope.exp == null){
      $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false,
        isSecondOpen:true,
      };
    } else {
      $scope.status = {
        isFirstOpen: false,
        isSecondOpen:false,
         isThirdOpen:$scope.exp
      };
    }
    

    var linkedinLibLoaded = false,
    linkedinLibInitialized = false;

  	window.linkedinLibInit = function(){
  	    linkedinLibInitialized = true;
  	};	
	  if(!$rootScope.linkedin){	
  		$rootScope.linkedin = true;
  		$.getScript("//platform.linkedin.com/in.js?async=true", function success() {
  		IN.init({
  		    onLoad: "onLinkedInLoad",
  		    api_key: "7536zmyvst4w84",
  		    credentials_cookie: true
  		    });
  		});	
	  }

  

	  $scope.hideEdit='false';
    $scope.updateButton = 'false';
    $scope.getUserProfile = function () {
      linkedinService.getProfile(function(err, result){
        if(err){
          console.log('error occured');
        }
        else{
          //console.log('result', result);
          $scope.linkedinData = result;
          regService.addLinkedinDataf($scope.linkedinData).then(function(response) {
            // console.log(response.data);
          $scope.temp = localStorageService.get('authorizationData');
          $scope.temp.employment =  $scope.linkedinData.CurrentEmployment;
          localStorageService.set('authorizationData', $scope.temp);
            if (response.data == 'true') {
              console.log('success'); 
              // $location.path('/edit-profile-new');
              $route.reload();
            }
            else{
              console.log('failed');
            }
          });
        }
      });
    };


//     regService.getProfileDetail().then(function (response) {
//        // console.log(response);
//         $scope.profileDetail = response.data;
//         $scope.pict = $scope.imagepath + $scope.profileDetail.Picture;
//        // $scope.profileDetail.birthdate = $filter('date')(new Date($scope.profileDetail.birthdate),'dd-mm-yy');
//         //console.log($scope.profileDetail.birthdate);
//
//         if ($scope.profileDetail.linked_update == 1) {
//          $scope.updateButton = 'true';
//          $scope.disable = 'false';
//          //console.log($scope.disable);
//         }else if ($scope.profileDetail.linked_update == 0) {
//         	$scope.disable = 'true';
//         }
//      });

     regService.getEditProfileDetail().then(function (response) {
         // console.log(response);
          $scope.profileDetail = response.data.profile;
          // console.log($scope.profileDetail);
          $scope.temp = localStorageService.get('authorizationData');
          // console.log($scope.temp);
          $scope.temp.employment =  $scope.profileDetail.CurrentEmployment;
          localStorageService.set('authorizationData', $scope.temp);
          $scope.questions = response.data.question;
          $scope.religion = response.data.religion[0].Answer;
          $scope.pict = $scope.imagepath + $scope.profileDetail.Picture;
         // $scope.profileDetail.birthdate = $filter('date')(new Date($scope.profileDetail.birthdate),'dd-mm-yy');
          //console.log($scope.profileDetail.birthdate);

          if ($scope.profileDetail.linked_update == 1) {
           $scope.updateButton = 'true';
           $scope.disable = 'false';
           //console.log($scope.disable);
          }else if ($scope.profileDetail.linked_update == 0) {
          	$scope.disable = 'true';
          }
       });

     $scope.errorMessage = '';
  $scope.saveButtonClick = function(){
  	//console.log($scope.profileDetail);
  	$scope.profileDetail.UpdatedPicture=$scope.image;
  	regService.updateProfileDetail($scope.profileDetail).then(function (response) {
        //console.log(response);

        if(response.data == "true"){
          regService.getProfileDetail().then(function (response) {
            // console.log(response);
             $scope.profileDetail = response.data;

             $scope.pict = $scope.imagepath + $scope.profileDetail.Picture;
            // console.log($scope.pict);

             $scope.temp = localStorageService.get('authorizationData');
             $scope.temp.picture = $scope.pict;
             $scope.temp.location = $scope.profileDetail.location;
             $scope.temp.Moto = $scope.profileDetail.Moto;
             $scope.temp.birthdate = $scope.profileDetail.birthdate;
             //console.log($scope.temp);
             localStorageService.set('authorizationData', $scope.temp);

             $scope.temp = localStorageService.get('authorizationData');
              //console.log($scope.temp);
             if ($scope.profileDetail.linked_update == 1) {
              $scope.updateButton = 'true';
              $scope.disable = 'false';
             // console.log($scope.disable);
             }else if ($scope.profileDetail.linked_update == 0) {
              $scope.disable = 'true';
             }
             $route.reload();

          });
         	 
         }else {
        	 $scope.errorMessage = 'Please select a valid birthdate';
        	 
         }
      });
  	
  }

//  getAllQuestion();
//    function getAllQuestion(){
//      Questionnaire.getAllQuestionsUser().then(function (response) {
//        //console.log(response.data);
//        //$scope.questions = response.data;
//    });
//    }

    $scope.imageErr = '';
    $scope.imageSucc = '';
    $scope.disable_save = false;
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
        	$scope.disable_save = true;
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
        	if (response == 'max_size_exceeded') {
				//console.log('Maximum size is 2 mb');
				$scope.imageErr = 'Maximum image size is 2mb';
			} 
        	else if(response.filename != '') {
        		console.info('onCompleteItem', fileItem, response, status, headers);
                $scope.image=response.filename;
                $scope.imageSucc = 'Image got Uploaded, Please save the change.';
                $scope.disable_save = false;
        		
        	}
            console.info('onCompleteItem', fileItem, response, status, headers);
            $scope.image=response.filename;
            //console.log( $scope.image);
            //console.log(status);
           // console.log(headers);
        };
        uploader.onCompleteAll = function() {
            //console.info('onCompleteAll');
            //alert("Image Uploaded.");
        };

        console.info('uploader', uploader);







      
  }]);
