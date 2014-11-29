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
  .config(function () {

  })
  .factory('RobotFactory', function($resource, $http) {
    $http.defaults.useXDomain = true;

    return $resource('http://:ipAddress/:action', { action: '@action' }, {
      connect : { method: 'GET', params: { action: 'Authenticate' } },
      move : { method: 'GET', params: { action: 'Move' } }
    });
  });
