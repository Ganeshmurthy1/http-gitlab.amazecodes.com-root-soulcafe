'use strict';

/**
 * @ngdoc service
 * @name sassApp.analytics
 * @description
 * # analytics
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('analytics', function($window) {

return {

logPageLoad: function (scope, absoluteUrl, locationPath) {      
    if (absoluteUrl.indexOf("soulcafe.singles") > 0) {
      scope.$on('$viewContentLoaded', function(event) {
      console.log('tracked');
      $window._gaq.push(['_trackPageview', locationPath]);
      });
    } else {
      console.log('not tracked', locationPath);
    }
  }

};

});