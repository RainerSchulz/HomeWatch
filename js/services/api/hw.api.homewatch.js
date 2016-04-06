/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('HomeWatchService', function ($http, notification, $log, $q, CacheService, $rootScope, Page) {
    var data = [];
    var deffered = $q.defer();
    var HomeWatchService = {};


    HomeWatchService.getJsonListByRoom = function (room) {
        var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + $rootScope.config.globals.room + '=' + room + $rootScope.config.globals.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();
                $log.debug("HomeWatchService by room");
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });


        /*
         return CacheService.jsonCache(room, data, url);

         */
    };

    HomeWatchService.getJsonListByAdvice = function (device) {
        var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + $rootScope.config.globals.genericDeviceType + device + $rootScope.config.globals.param;
        $log.debug(url);
        $log.debug('$rootScope.config.connection.internet: ' + $rootScope.config.connection.internet);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeWatchService.getJsonList = function (name, type) {
        var url = '';
        if ($rootScope.config.connection.isDebug) {
            url = 'json/homewatch/data/' + name + '.json';
        } else {
            url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
        }

        $log.debug('getHome url: ' + url);
        $log.debug('name: ' + name + ' type: ' + type);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve(data);

                $log.debug("Success HomeWatchService.getJsonList");
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeWatchService.setFavorit = function (name, type) {

        var url = $rootScope.MetaDatafhemweb_url + '?cmd=attr%20' + name + '%20like%20' + type + $rootScope.config.globals.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeWatchService.setPreset = function (name, preset) {
        //set Cam_Demowand preset alarm
        var url = $rootScope.MetaDatafhemweb_url + '?cmd=%20set%20' + name + '%20preset%20' + preset + $rootScope.config.globals.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeWatchService Camera set preset OK");
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeWatchService.data = function () {
        return data;
    };
    return HomeWatchService;
});
