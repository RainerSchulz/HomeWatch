/**
 * Created by Rainer on 09.02.2016.
 */
(function () {
    'use strict';
    function WidgetsController($scope, $location, $rootScope, $http, $log, $q, $routeParams, Page, HomeWatchFactory, RoomService, FillAllDataService, HomeWidgetsService, CookiesService) {
        $log.debug('WidgetsController startet');

        $scope.header = $routeParams.name;
        $scope.location = '/Liegenschaften';

        $rootScope.currentRoom = 'all';
        $rootScope.location = $routeParams.name;

        // set Page Title
        Page.setTitle($scope.header);

        // Init
        $scope.init = function () {
            $scope.headerImage = $rootScope.headerImage;

            $log.debug('HomeAll fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);

            $rootScope.home = [];
            $scope.sidebar_right = [];
            $scope.sidebar_right_top = [];

            $rootScope.rooms = $q.defer();

            $rootScope.filterRoom = [];

            $scope.result = [];
            $scope.headerImage = $rootScope.headerImage;

            // get HomeWidgets
            $rootScope.homeWidgets = $q.defer();

            GetHomeWidgets($scope, $rootScope);
            GetSidebarRight($scope);

        };

        $scope.roomFilter = function (item) {
            if ($scope.filterRoom.length == 0) {
                return true;
            }
            return $scope.filterRoom.indexOf(item.Attributes.room) > -1;
        };

        // Navigation Left Rooms
        function GetRoomsLeft(widgets) {
            $log.debug('start GetRoomsLeft' + widgets.length);
            $rootScope.rooms.resolve(RoomService.getRooms(widgets));
        }


        // get sidebar right from service jsonlist
        function GetSidebarRight($scope) {
            var name = 'sidebar_right';
            var type = 'room';
            $scope.sidebar_right = HomeWatchFactory.getFhemJsonList(name, type);
            //the model returns a promise and THEN items
            $scope.sidebar_right.then(function (data) {
                $scope.sidebar_right = data.Results;
                $scope.sidebar_right_top = data.Results;
            }, function (status) {
                $log.debug(status);
            });
        }

        function GetHomeWidgets($scope, $rootScope) {
            // get widgets from cookie
            var location = $routeParams.name;

            $rootScope.homeWidgets = HomeWatchFactory.getLocationWidgets(location);
            //the model returns a promise and THEN items
            $rootScope.homeWidgets.then(function (data) {
                var name = data.name;
                var type = data.type;
                var names = name.split(',');

                var deferred = $q.defer();
                angular.forEach(names, function (value) {
                    $rootScope.homeWidgets = HomeWatchFactory.getFhemJsonList(value, type);
                    //the model returns a promise and THEN items
                    $rootScope.homeWidgets.then(function (response) {
                        $scope.result.push(response.Results);
                        GetRoomsLeft($scope.result);

                    }, function (status) {
                        $log.debug(status);
                    });
                });

                $q.all($scope.result).then(function () {
                })


            }, function (status) {
                $log.debug(status);
            });

        }

    }

    WidgetsController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', '$q', '$routeParams', 'Page', 'HomeWatchFactory', 'RoomService', 'FillAllDataService', 'HomeWidgetsService', 'CookiesService'];


    angular.module('myApp')
        .controller('WidgetsController', WidgetsController);
}());