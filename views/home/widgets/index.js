/**
 * Created by Rainer on 09.02.2016.
 */
(function () {
    'use strict';
    function WidgetsController($scope, $location, $rootScope, $http, $log, $q, $routeParams, Page, HomeService, connection, HomeWidgetsService, Jsonervice, RoomService) {
        $log.debug('WidgetsController startet');

        $scope.header = $routeParams.name;
        $scope.location = '/Liegenschaften';

        $rootScope.currentRoom = 'all';
        $rootScope.location = $routeParams.name;

        // set Page Title
        Page.setTitle($scope.header);

        // Init
        $scope.init = function () {
            $log.debug('HomeAll fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);

            $rootScope.navRight = $q.defer();
            $rootScope.home = $q.defer();
            $rootScope.navRightTop = $q.defer();
            $rootScope.rooms = $q.defer();
            $rootScope.filterRoom = [];

            $scope.result = [];

            // get HomeWidgets
            $rootScope.homeWidgets = $q.defer();
            GetHomeWidgets($scope);

            GetFhemJsonFile($scope, $rootScope);
            GetNavRight($scope, $http);
        };

        $scope.roomFilter = function (item) {
            if ($scope.filterRoom.length == 0) {
                return true;
            }
            return $scope.filterRoom.indexOf(item.Attributes.room) > -1;
        };

        // Navigation Left Rooms
        function GetRoomsLeft($scope, result) {
            $log.debug('start NavLeft getRooms');
            $scope.headerImage = $rootScope.headerImage;
            $rootScope.rooms.resolve(RoomService.getRooms(result));
        }

        // Navigation Right
        function GetNavRight($scope) {
            $scope.headerImage = $rootScope.headerImage;

            if (connection.isDebug) {
                Jsonervice.getJson('data/sidebar_right').then(function () {
                        var data = Jsonervice.data();

                        $rootScope.navRight.resolve(data.Results);
                        $rootScope.navRightTop.resolve(data.Results);
                        //$scope.navRight = $scope.navRightTop = data.Results;
                        //$log.debug('$scope.navRight.length by getJson: ' + $scope.navRight.length);
                    })
                    .catch(function (callback) {
                        $log.debug(callback);
                    });
            }
            else {
                var value = 'sidebar_right';
                var type = 'room';
                $log.debug('start NavRight: ' + value);
                HomeService.getHome(value, type).then(function () {
                        $log.debug('Success getHome: ' + type + ' : ' + value);

                        var data = HomeService.data();
                        $rootScope.navRight.resolve(HomeService.data().Results);
                        $rootScope.navRightTop.resolve(HomeService.data().Results);
                        //$log.debug('$scope.navRight.length by getHome: ' + $scope.navRight.length);

                    })
                    .catch(function (callback) {
                        $log.debug(callback);

                        Jsonervice.getJson('data/sidebar_right').then(function () {
                                var data = Jsonervice.data();
                                $scope.navRight = data.Results;
                                $log.debug('$scope.navRight.length by getJson: ' + $scope.navRight.length);
                            })
                            .catch(function (callback) {
                                $log.debug(callback);
                            });

                    });
            }

        }

        // Navigation Left
        function GetHomeWidgets($scope) {
            $log.debug('Start Get Home Widgets: ' + $routeParams.name);
            $scope.homeWidgets.resolve(HomeWidgetsService.getHomeWidgets($routeParams.name));
        }


        // Widget Content
        function homeWidgets(values, $scope, $rootScope, promises) {
            angular.forEach(values, function (value) {

                // create a $q deferred promise
                var deferred = $q.defer();
                if (connection.isDebug) {
                    HomeService.getHomeByIdJson(value).then(function () {
                            var data = HomeService.data();

                            // promise successfully resolved
                            deferred.resolve(data);

                            if (data.Results.length > 0) {
                                $log.debug('HomeAll getHomeByIdJson add Widgets: ' + $rootScope.type + ' : ' + value + ' - '  + data.Results.length);
                                $log.debug(data.Results);
                                $scope.result.push(data.Results);
                            }

                        })
                        .catch(function (callback) {
                            $log.debug(callback);
                        });
                }
                else {
                    HomeService.getHome(value, $rootScope.type).then(function () {
                            var data = HomeService.data();

                            // promise successfully resolved
                            deferred.resolve(data);

                            if (data.Results.length > 0) {
                                $log.debug('HomeAll getHome add Widgets: ' + $rootScope.type + ' : ' + value + ' - '  + data.Results.length);
                                $log.debug(data.Results);
                                $scope.result.push(data.Results);
                            }

                        })
                        .catch(function (callback) {
                            $log.debug(callback);

                            HomeService.getHomeByIdJson(value).then(function () {
                                    $log.debug('getHomeByIdJson: ' + value);

                                    var data = HomeService.data();
                                    // promise successfully resolved
                                    deferred.resolve(data);

                                    if (data.Results.length > 0) {
                                        $log.debug('HomeAll getHomeByIdJson add Widgets: ' + $rootScope.type + ' : ' + value + ' - '  + data.Results.length);
                                        $log.debug(data.Results);
                                        $scope.result.push(data.Results);
                                    }

                                })
                                .catch(function (callback) {
                                    $log.debug(callback);
                                });

                        });
                }
                // add to the list of promises
                promises.push(deferred.promise);
            });
        }

        function GetFhemJsonFile($scope, $rootScope) {
            // list of all promises
            var promises = [];
            if (angular.isUndefined($rootScope.name)) {
                Jsonervice.getJsonById('home', $rootScope.location).then(function () {
                        var data = Jsonervice.data();
                        if (angular.isUndefined(data.name)) {
                            $log.debug('No data.name value');
                        } else {
                            $rootScope.name = data.name;
                            var values = $rootScope.name.split(',');
                            homeWidgets(values, $scope, $rootScope, promises);
                        }

                    })
                    .catch(function (callback) {
                        $log.debug(callback);
                    });
            }
            else {

                var values = $rootScope.name.split(',');
                homeWidgets(values, $scope, $rootScope, promises);
            }


            // execute all the promises and do something with the results
            $q.all(promises).then(
                function (results) {
                    $log.debug('Success promises results.length :' + results.length);
                    $log.debug(results);

                    GetRoomsLeft($scope, results);

                },
                // error
                function (response) {
                    $log.debug('Failed: ' + response);
                }
            );
        }

    }

    WidgetsController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', '$q', '$routeParams', 'Page', 'HomeService', 'connection', 'HomeWidgetsService', 'Jsonervice', 'RoomService'];


    angular.module('myApp')
        .controller('WidgetsController', WidgetsController);
}());