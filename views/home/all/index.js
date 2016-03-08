/**
 * Created by Rainer on 09.01.2016.
 */
(function () {
    'use strict';
    function HomeAllController($scope, $location, $rootScope, $http, $log, $routeParams, Page, HomeService, FavoritenService, Jsonervice) {
        $log.debug('HomeAllController startet')
        var self = this;
        $scope.header = $routeParams.name;
        $scope.location = '/Liegenschaften';
        $log.debug($rootScope);
        $log.debug($routeParams);

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            $log.debug('HomeAll fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);
            $scope.navButton = [];
            $scope.navRightButton = [];
            $scope.result = [];
            GetNav($scope, $http);
            GetNavRight($scope, $http);
            GetFhemJsonFile($scope, $http);
        };

        $scope.buttonNavClick = function (title) {
            var path = '/home/' + $rootScope.id + '/' + $rootScope.name + title;
            $location.path(path);
        };

        // Navigation Left
        function GetNav($scope, $http) {
            Jsonervice.getJson($routeParams.name + 'Nav').then(function () {
                    var data = Jsonervice.data();
                    $scope.navButton = data.resultNav; // response data
                    $log.debug($scope.navButton);
                })
                .catch(function (callback) {
                    $log.debug(callback);

                });
        }

        // Navigation Right
        function GetNavRight($scope, $http) {
            $scope.headerImage = $rootScope.headerImage;
            Jsonervice.getJson('navigationRight').then(function () {
                    var data = Jsonervice.data();
                    $scope.navRightButton = data.resultNavRight; // response data
                    $log.debug($scope.navRightButton);

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });
        }

        // Widget Content
        function GetFhemJsonFile($scope, $http) {
            var values = $rootScope.name.split(',');
            angular.forEach(values, function (value) {

                HomeService.getHome(value, $rootScope.type).then(function () {
                        $log.debug('HomeAll: ' + $rootScope.type + ' : ' + value);
                        var data = HomeService.data();
                        $scope.result.push(data.Results);
                        $log.debug('$scope.result.length 2:' + $scope.result.length);

                    })
                    .catch(function (callback) {
                        $log.debug(callback);

                        HomeService.getHomeByIdJson(value).then(function () {
                                $log.debug('getHomeByIdJson: ' + value);
                                var data = HomeService.data();
                                $scope.result.push(data.Results);
                                $log.debug('$scope.result.length 2:' + $scope.result.length);

                            })
                            .catch(function (callback) {
                                $log.debug(callback);
                            });

                    });

            });
        }

    }

    HomeAllController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'HomeService', 'FavoritenService', 'Jsonervice'];


    angular.module('myApp')
        .controller('HomeAllController', HomeAllController);
}());