/**
 * Created by Rainer on 29.01.2016.
 */
(function () {
    'use strict';
    function HomeController($scope, $location, $q, $rootScope, $http, $log, $routeParams, Page, Jsonervice, HomeService, globalSettings) {
        $log.debug('HomeController startet');

        var self = this;
        $scope.header = 'Home';
        $scope.location = '/Liegenschaften';

        $scope.home = [];
        $scope.sidebar_left = [];

        // set Page Title
        Page.setTitle($scope.header);

        // Init
        $scope.init = function () {

            //$rootScope.sidebar_left = $q.defer();

            GetJsonFileName($scope, 'data/sidebar_left');
            GetJsonFile($scope, $http);
        };

        $scope.buttonClick = function (item) {
            $log.debug('nav-click: ');
            $log.debug(item);

            $rootScope.headerImage = item.headerImage;

            $rootScope.alias = item.alias;
            $rootScope.name = item.name;
            $rootScope.type = item.type;
            var path = $scope.location + '/' + $routeParams.id + '/home/' + item.location;
            $location.path(path);
        };


        function GetJsonFileName($scope, name) {

            Jsonervice.getJson(name).then(function () {
                    var data = Jsonervice.data();
                    $scope.sidebar_left = data.Results; // response data
                    $log.debug($scope.sidebar_left);
                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }

        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('home').then(function () {
                    var data = Jsonervice.data();
                    $scope.home = data.Results; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }
    }

    HomeController.$inject = ['$scope', '$location', '$q', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'Jsonervice', 'HomeService', 'globalSettings'];


    angular.module('myApp')
        .controller('HomeController', HomeController);
}());