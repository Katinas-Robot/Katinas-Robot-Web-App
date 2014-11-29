'use strict';

angular.module('katinasRobotWebApp')
  .controller('MainCtrl', function ($scope, RobotFactory) {
    $scope.robotData = {
      isConnecting: false,
      isConnected: false,
      lastDirection: null,
      ipAddress: null
    };

    $scope.connect = function () {
      if (!$scope.robotData.ipAddress) {
        return ;
      }


      $scope.robotData.isConnecting = true;
      RobotFactory.connect({ ipAddress: $scope.robotData.ipAddress }, function (){
        $scope.robotData.isConnecting = false;
        $scope.robotData.isConnected = true;

      }, function () {

        $scope.robotData.isConnecting = false;
      });

      $scope.robotData.isOnline = true;
    };

    $scope.move = function (direction) {
      if ($scope.lastDirection === direction){
        return;
      }

      RobotFactory.move({ ipAddress: $scope.robotData.ipAddress, direction: direction }, function () {
        $scope.lastDirection = direction;
      });
    };

  });
