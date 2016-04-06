/**
 * Created by Rainer on 09.01.2016.
 */

(function () {
    'use strict';
    function LiegenschaftenController($scope, $location, $window, $rootScope, $http, $log, Page, HomeWatchFactory) {
        $log.debug('LiegenschaftenController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Liegenschaften';
        $scope.location = '/Liegenschaften';

        $scope.sites = [];
        $scope.standardButton = [];

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetStandard($scope, $http);
            GetSites($scope, $http);
        };

        $scope.click = function (item) {
            $rootScope.id = item.id;
            // set Page MetaData
            Page.setMetaData("fhemweb_url", item.Internals.LINK + $rootScope.config.globals.fhem);
            $log.debug("LiegenschaftenController fhemweb_url:" + Page.getMetaData('fhemweb_url'));
            var path = $scope.location + '/' + item.Name + '/home/';
            $location.path(path);
        };

        $scope.standardClick = function (item) {
            var gotoLocation = $scope.location + '/' + item.id + '/home/';

            if (item.fhemweb_url != '') {
                // set Page MetaData
                Page.setMetaData("fhemweb_url", item.fhemweb_url);
                $log.debug('Liegenschaften fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);

                // goto location
                $log.debug('Location: ' + gotoLocation);
                $location.path(gotoLocation);
            }
            else if (item.target != '') {
                $log.debug('Url: ' + item.url);
                // $window.location.href = item.url;
                $window.open(item.url, item.target)
            }
            else {
                $log.debug('Location: ' + item.location);
                $location.path(item.location);
            }
        };

        // der untere Bereich unterhalb der Linie, werden aus einer Json Datei geholt
        function GetStandard($scope, $http) {

            var name = 'liegenschaftenDefault';
            $scope.standardButton = HomeWatchFactory.getJson(name);
            //the model returns a promise and THEN items
            $scope.standardButton.then(function (data) {
                $scope.standardButton = data.Results
            }, function (status) {
                $log.debug(status);
            });
        }

        // die Liegenschaften werden über einen Service Jsonlist geholt
        function GetSites($scope, $http) {

            // prüfen ob die Metadaten gefüllt sind
            if (!$rootScope.MetaDatafhemweb_url) {
                Page.setMetaData('fhemweb_url', $rootScope.config.connection.fhemweb_url);
            }

            var name = 'site';
            var type = 'genericDeviceType';
            $scope.sites = HomeWatchFactory.getFhemJsonList(name, type);
            //the model returns a promise and THEN items
            $scope.sites.then(function (data) {
                $scope.sites = data.Results
            }, function (status) {
                $log.debug(status);
            });
        }

    }

    LiegenschaftenController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', 'Page', 'HomeWatchFactory'];


    angular.module('myApp')
        .controller('LiegenschaftenController', LiegenschaftenController);
}());