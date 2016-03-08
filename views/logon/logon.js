/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function LogonController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug( 'LogonController gestartet!');

        var self = this;

// create a message to display in our view
        $scope.company = "CAMDATA";
        $scope.showModal = false;

        $scope.LogonButton = [];

        // set Page Title
        Page.setTitle("");

        $scope.init = function () {
            //LogonService.IsOnline
            //GetJsonFile($scope, $http);
        };

        $scope.startLiegenschaften = function () {
            var name = "/Liegenschaften";
            $location.path(name);
        };

        function GetJsonFile($scope, $http) {
            $http({
                method: 'POST',
                url: 'json/LogonButton.json'
            }).success(function (data) {
                    $scope.LogonButton = data.LogonButton; // response data
                })
                .error(function (data, status) {
                    // log error
                    console.log('error: ' + status);
                });
        }

    }

    LogonController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log','Page'];


    angular.module('myApp')
        .controller('LogonController', LogonController);
}());