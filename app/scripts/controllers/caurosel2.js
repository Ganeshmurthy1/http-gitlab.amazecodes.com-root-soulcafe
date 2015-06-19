'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:Caurosel2Ctrl
 * @description
 * # Caurosel2Ctrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('Caurosel2Ctrl',['$scope', 'FlickrApi', function ($scope, flickr) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var carousel;

    $scope.hasPrevious = function() {
      return carousel ? carousel.hasPrevious() : false;
    };
    $scope.previous = function() {
      if (carousel) { carousel.prev(); }
    };
    $scope.hasNext = function() {
      return carousel ? carousel.hasNext() : false;
    };
    $scope.next = function() {
      if (carousel) { carousel.next(); }
    };


    var loadPhotos = function(carouselScope, page) {
      carousel.updatePageCount(6);
      carouselScope.photos = flickr.getPhotos(page);
      carouselScope.getPhotoUrl = function(photo) {
        return flickr.getPhotoUrl(photo);
      };
    };
    $scope.loadPage = function(page, tmplCb) {
      var newScope = $scope.$new();
      loadPhotos(newScope, page);
      tmplCb(newScope);
    };
    $scope.onCarouselAvailable = function(car) {
      carousel = car;
    };
  }]);
