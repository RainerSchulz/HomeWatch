/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function VerwaltungController($scope, $location, $window, $rootScope, $q, $log, $routeParams, Page, HomeWidgetsService) {
        $log.debug('VerwaltungController startet');
        $log.debug($routeParams);
        $log.debug($rootScope);
        var self = this;
        $scope.header = 'Verwaltung';
        $scope.location = '/Liegenschaften';

        $rootScope.sidebar_left = $q.defer();
        $rootScope.sidebar_preference = $q.defer();


        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            $rootScope.sidebar_left.resolve(HomeWidgetsService.getHomeSidebar('sidebar_left'));
            $rootScope.sidebar_preference.resolve(HomeWidgetsService.getHomeSidebar('sidebar_preference'));
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
    }

    VerwaltungController.$inject = ['$scope', '$location', '$window', '$rootScope', '$q', '$log', '$routeParams', 'Page', 'HomeWidgetsService'];


    angular.module('myApp')
        .controller('VerwaltungController', VerwaltungController);
}());