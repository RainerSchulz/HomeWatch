/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function HomeController($scope, $location, $window, $rootScope, $http, $log, $routeParams, Page, Jsonervice, HomeService) {
        $log.debug('HomeController startet');
        $log.debug($routeParams);
        $log.debug($rootScope);
        var self = this;
        $scope.header = 'Home';
        $scope.location = '/Liegenschaften';

        $scope.home = [];
        $scope.navLeft = [];

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNavLeft($scope, $http);
            GetJsonFile($scope, $http);
        };

        $scope.buttonClick = function (item) {
            $log.debug('nav-click: ');
            $log.debug(item);

            $rootScope.headerImage = item.headerImage;

            $rootScope.alias = item.alias;
            $rootScope.name = item.name;
            $rootScope.type = item.type;
            var path = $scope.location + '/' + $routeParams.id + '/home' + item.buttonClick;
            $location.path(path);
        };

        $scope.defaultClick = function (item) {
            if (item.target != '') {
                $log.debug('Url: ' + item.url);
                // $window.location.href = item.url;
                $window.open(item.url, item.target)
            } else {
                $log.debug('Location: ' + item.location);
                $location.path(item.location);
            }
        };

        // Left Navigation
        function GetNavLeft($scope, $http) {

            var value = 'sidebar_left';
            var type = 'room';
            HomeService.getHome(value, type).then(function () {
                    $log.debug(type + ' : ' + value);
                    var data = HomeService.data();
                    $scope.navLeft = data.Results;
                    $log.debug('$scope.result.length: ' + $scope.navLeft.length);

                })
                .catch(function (callback) {
                    $log.debug(callback);

                    Jsonervice.getJson('navigationLeft').then(function () {
                            var data = Jsonervice.data();
                            $scope.navLeft = data.resultNav; // response data
                        })
                        .catch(function (callback) {
                            $log.debug(callback);
                        });

                });


        }


        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('home').then(function () {

                    var data = Jsonervice.data();

                    $scope.home = data.home; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };


    }

    HomeController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'Jsonervice', 'HomeService'];


    angular.module('myApp')
        .controller('HomeController', HomeController);
}());