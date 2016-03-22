/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function LiegenschaftenController($scope, $location, $window, $rootScope, $http, $log, Page, Jsonervice, globalSettings, MetaService, HomeService) {
        $log.debug('LiegenschaftenController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Liegenschaften';
        $scope.location = '/Liegenschaften';

        $scope.results = [];
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
            Page.setMetaData("fhemweb_url", item.Internals.LINK);

            var path = $scope.location + '/' + item.Name + '/home/';
            $location.path(path);
        };

        $scope.defaultClick = function (item) {
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
            } else {
                $log.debug('Location: ' + item.location);
                $location.path(item.location);
            }
        };

        function GetStandard($scope, $http) {

            Jsonervice.getJson('liegenschaftenDefault').then(function () {

                    var data = Jsonervice.data();
                    $scope.standardButton = data.result; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }

        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('Liegenschaften').then(function () {

                    var data = Jsonervice.data();

                    $scope.results = data.Liegenschaften; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }

        function GetSites($scope, $http) {

            var value = 'site';
            var type = 'genericDeviceType';

            // check if isDebug mode
            if (globalSettings.isDebug) {
                $log.debug('globalSettings.isDebug: ' + value);
                // check if isDebug mode
                Jsonervice.getJson('data/' + value).then(function () {

                        var data = Jsonervice.data();
                        $scope.results = data.Results; // response data
                    })
                    .catch(function (callback) {
                        $log.debug(callback);
                    });

            }
            else {
                HomeService.getHome(value, type).then(function () {
                        $log.debug(type + ' : ' + value);
                        var data = HomeService.data();
                        $scope.results = data.Results;
                        $log.debug('$scope.result: ' + $scope.result);

                    })
                    .catch(function (callback) {
                        $log.debug(callback);

                        Jsonervice.getJson(value).then(function () {
                                var data = Jsonervice.data();
                                $scope.results = data.Results; // response data
                            })
                            .catch(function (callback) {
                                $log.debug(callback);
                            });

                    });
            }
        }

    }

    LiegenschaftenController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', 'Page', 'Jsonervice', 'globalSettings', 'MetaService', 'HomeService'];


    angular.module('myApp')
        .controller('LiegenschaftenController', LiegenschaftenController);
}());