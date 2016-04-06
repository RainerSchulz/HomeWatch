/**
 * Created by Rainer on 29.01.2016.
 */
(function () {
    'use strict';
    function HomeController($scope, $location, $q, $rootScope, $log, $routeParams, Page, HomeWatchFactory) {
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

            if (!$rootScope.MetaDatafhemweb_url) {
                Page.setMetaData('fhemweb_url', $rootScope.config.connection.fhemweb_url);
            }
            GetSidebar($scope);
            GetHomeContent($scope);
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

        // get sidebar left from service jsonlist
        function GetSidebar($scope) {
            var name = 'sidebar_left';
            var type = 'room';
            $scope.sidebar_left = HomeWatchFactory.getFhemJsonList(name, type);
            //the model returns a promise and THEN items
            $scope.sidebar_left.then(function (data) {
                $scope.sidebar_left = data.Results;
            }, function (status) {
                $log.debug(status);
            });
        }

        // get home widgets from json file
        function GetHomeContent($scope) {
            var name = 'home';
            $scope.home = HomeWatchFactory.getJson(name);
            //the model returns a promise and THEN items
            $scope.home.then(function (data) {
                $scope.home = data.Results;
            }, function (status) {
                $log.debug(status);
            });
        }
    }

    HomeController.$inject = ['$scope', '$location', '$q', '$rootScope', '$log', '$routeParams', 'Page', 'HomeWatchFactory'];


    angular.module('myApp')
        .controller('HomeController', HomeController);
}());