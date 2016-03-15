/**
 * Created by Rainer on 09.01.2016.
 */
(function () {
    'use strict';
    function HomeAllController($scope, $location, $rootScope, $http, $log, $q, $routeParams, Page, HomeService, FavoritenService, Jsonervice, RoomService) {
        $log.debug('HomeAllController startet');
        var self = this;
        $scope.header = $routeParams.name;
        $scope.location = '/Liegenschaften';
        $log.debug($rootScope);
        $log.debug($routeParams);

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            $log.debug('HomeAll fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);
            $scope.rooms = [];
            $scope.navRightButton = [];
            $scope.result = [];

            GetNavRight($scope, $http);
            GetFhemJsonFile($scope, $http);
        };

        $scope.buttonNavClick = function (title) {
            var path = '/home/' + $rootScope.id + '/' + $rootScope.name + title;
            $location.path(path);
        };

        // Navigation Left
        function GetRoomsLeft($scope, result) {
            $log.debug('start NavLeft getRooms');
            $scope.headerImage = $rootScope.headerImage;
            $log.debug($scope.headerImage);
            $scope.rooms = RoomService.getRooms(result);
            $log.debug($scope.rooms);
        }

        // Navigation Right
        function GetNavRight($scope, $http) {
            $scope.headerImage = $rootScope.headerImage;

            var value = 'sidebar_right';
            var type = 'room';
            $log.debug('start NavRight: ' + value);
            HomeService.getHome(value, type).then(function () {
                    $log.debug('Success getHome: ' + type + ' : ' + value);

                    var data = HomeService.data();
                    $scope.navRight = data.Results;
                    $log.debug('$scope.navRight.length by getHome: ' + $scope.navRight.length);

                })
                .catch(function (callback) {
                    $log.debug(callback);

                    Jsonervice.getJson('data/sidebar_right').then(function () {
                            var data = Jsonervice.Results();
                            $scope.navRight = data;
                            $log.debug('$scope.navRight.length by getJson: ' + $scope.navRight.length);
                        })
                        .catch(function (callback) {
                            $log.debug(callback);
                        });

                });


        }


        // Widget Content
        function GetFhemJsonFile($scope, $http) {
            // list of all promises
            var promises = [];

            var values = $rootScope.name.split(',');
            angular.forEach(values, function (value) {

                // create a $q deferred promise
                var deferred = $q.defer();

                HomeService.getHome(value, $rootScope.type).then(function () {
                        var data = HomeService.data();

                        if (data.Results.length > 0) {
                            $log.debug('HomeAll add Widgets: ' + $rootScope.type + ' : ' + value);
                            $log.debug('data.Results.length: ' + data.Results.length);
                            $scope.result.push(data.Results);
                            // promise successfully resolved
                            deferred.resolve(data);
                        }

                    })
                    .catch(function (callback) {
                        $log.debug(callback);

                        HomeService.getHomeByIdJson(value).then(function () {
                                $log.debug('getHomeByIdJson: ' + value);
                                var data = HomeService.data();
                                $scope.result.push(data.Results);


                            })
                            .catch(function (callback) {
                                $log.debug(callback);
                            });

                    });
                // add to the list of promises
                promises.push(deferred.promise);
            });

            // execute all the promises and do something with the results
            $q.all(promises).then(
                function (results) {
                    $log.debug('Success promises results.length :' + results.length);

                    GetRoomsLeft($scope, $scope.result);

                },
                // error
                function (response) {
                    $log.debug('Failed: ' + response);
                }
            );
        }

    }

    HomeAllController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', '$q', '$routeParams', 'Page', 'HomeService', 'FavoritenService', 'Jsonervice', 'RoomService'];


    angular.module('myApp')
        .controller('HomeAllController', HomeAllController);
}());