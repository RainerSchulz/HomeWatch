/**
 * Created by Rainer on 29.01.2016.
 */
(function () {
    'use strict';
    function HomeController($scope, $location, $q, $rootScope, $http, $log, $routeParams, Page, Jsonervice, HomeService, HomeWidgetsService) {
        $log.debug('HomeController startet');

        var self = this;
        $scope.header = 'Home';
        $scope.location = '/Liegenschaften';


        // set Page Title
        Page.setTitle($scope.header);

        // Init
        $scope.init = function () {
            $scope.home = [];
            $rootScope.sidebar_left = $q.defer();
            if (!$rootScope.MetaDatafhemweb_url) {
                Page.setMetaData('fhemweb_url', $rootScope.config.connection.fhemweb_url);
            }
            $rootScope.sidebar_left.resolve(HomeWidgetsService.getHomeSidebar('sidebar_left'));
            GetHomeContent($scope, $http);
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

        function GetHomeContent($scope, $http) {
            Jsonervice.getJson('home').then(function () {
                    var data = Jsonervice.data();
                    $scope.home = data.Results; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }
    }

    HomeController.$inject = ['$scope', '$location', '$q', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'Jsonervice', 'HomeService', 'HomeWidgetsService'];


    angular.module('myApp')
        .controller('HomeController', HomeController);
}());