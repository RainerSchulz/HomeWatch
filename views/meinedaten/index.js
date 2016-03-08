/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function MeineDatenController($scope, $location, $rootScope, $http, $log, Page, Jsonervice) {
        $log.debug('MeineDatenController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'MeineDaten';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);

        $scope.result = [];
        $scope.navButton = [];

        $scope.init = function () {
            GetNav($scope, $http);
            GetJsonFile($scope, $http);

        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('meineDatenNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.resultNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };

        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('meineDaten').then(function () {

                    var data = Jsonervice.data();

                    $scope.result = data.result[0]; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };
    }

    MeineDatenController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('MeineDatenController', MeineDatenController);
}());