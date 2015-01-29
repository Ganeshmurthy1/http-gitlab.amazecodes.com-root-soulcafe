'use strict';

/**
 * @ngdoc service
 * @name sassApp.config
 * @description
 * # config
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('config', function (localStorageService) {

    var dataFactory = {};
      dataFactory.base_path = '/SASS/api/';
      var urlBase = '/SASS/api/';

      dataFactory.setConfigruation = function () {
        localStorageService.set('config', {
                  base_path:'/SASS/api/',
                  image_path:'http://192.168.1.130/SASS/api/uploads/'                
              });        
      }

        //  dataFactory.setConfigruation = function () {
        // localStorageService.set('config', {
        //           base_path:'/SASS/api/',
        //           image_path:'http://soulcafe.singles/SASS/api/uploads/'                
        //       });        
        // }

    // Public API here
    return dataFactory;
    
  });
