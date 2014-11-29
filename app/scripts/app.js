'use strict';

/**
 * @ngdoc overview
 * @name katinasRobotWebAppApp
 * @description
 * # katinasRobotWebAppApp
 *
 * Main module of the application.
 */
angular
  .module('katinasRobotWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
  }])
  .factory('RobotFactory', ['$resource', '$http', function($resource, $http) {
    $http.defaults.useXDomain = true;

    return $resource('http://:ipAddress/:action', { action: '@action' }, {
      connect : { method: 'GET', params: { action: 'Authenticate' } },
      move : { method: 'GET', params: { action: 'Move' } },
      startCapturing : { method: 'GET', params: { action: 'StartCapturing' } },
      stopCapturing : { method: 'GET', params: { action: 'StopCapturing' } },
      sendMessage : { method: 'GET', params: { action: 'DisplayMessage' } }
    });
  }]);
