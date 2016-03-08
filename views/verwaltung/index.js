/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function VerwaltungController($scope, $location, $window, $rootScope, $http, $log, $routeParams, Page, Jsonervice) {
        $log.debug('VerwaltungController startet');
        $log.debug($routeParams);
        $log.debug($rootScope);
        var self = this;
        $scope.header = 'Verwaltung';
        $scope.location = '/Liegenschaften';

        $scope.result = [];
        $scope.navButton = [];

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNav($scope, $http);
            GetJsonFile($scope, $http);
        };

        $scope.buttonClick = function (item) {
            $log.debug('nav-click: ');
            $log.debug(item);

            $rootScope.alias = item.alias;
            $rootScope.name = item.name;
            $rootScope.type = item.type;
            var path = $scope.location + '/' + $routeParams.id + '/home' + item.buttonClick;
            $location.path(path);
        };

        $scope.defaultClick = function (item) {
            $log.debug('Click: ' + item.url);
            if (item.target != '') {
               // $window.location.href = item.url;
                $window.open(item.url, item.target)
            } else {
                $location.path(item.url);
            }
        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('verwaltungNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.verwaltungNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };


        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('verwaltung').then(function () {

                    var data = Jsonervice.data();

                    $scope.result = data.result; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };


    }

    VerwaltungController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('VerwaltungController', VerwaltungController);
}());