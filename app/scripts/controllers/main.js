'use strict';

angular.module('katinasRobotWebApp')
  .controller('MainCtrl', ['$scope', 'RobotFactory', '$interval', function ($scope, RobotFactory, $interval) {
    $scope.robotData = {
      isConnecting: false,
      isConnected: false,
      isConnectionFailed: false,
      lastDirection: null,
      ipAddress: null,
      cameraImage: '',
      isRecording: false,

      isStartingCamera: false,
      isStoppingCamera: false
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
    };

    $scope.move = function (direction) {
      RobotFactory.move({ ipAddress: $scope.robotData.ipAddress, direction: direction }, function () {
        $scope.robotData.lastDirection = direction;
      });
    };

    $scope.sendMessage = function (msg) {
      RobotFactory.sendMessage({ ipAddress: $scope.robotData.ipAddress, message: msg });
    };

    $scope.startCamera = function () {
      $scope.robotData.isStartingCamera = true;
      RobotFactory.startCapturing({ ipAddress: $scope.robotData.ipAddress }, function () {
        $scope.robotData.isRecording = true;
        $scope.robotData.isStartingCamera = false;
      });
    };

    $scope.stopCamera = function () {
      $scope.robotData.isStoppingCamera = true;
      RobotFactory.stopCapturing({ ipAddress: $scope.robotData.ipAddress }, function () {
        $scope.robotData.isRecording = false;
        $scope.robotData.isStoppingCamera = false;
      });
    };

    $interval(function () {
      if ($scope.robotData.isConnected) {
        $scope.robotData.cameraImage = 'http://' + $scope.robotData.ipAddress + '/GetPicture?time=' + new Date().getTime();
      }
    }, 4000);

  }]);
