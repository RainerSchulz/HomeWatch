/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('HomeService', function ($http, notification, $log, $q, globalSettings, CacheService, connection, $rootScope, Page) {
    var data = [];
    var deffered = $q.defer();
    var HomeService = {};
    var urlcmd = Page.getMetaData('fhemweb_url') + globalSettings.cmd;

    HomeService.getHomeByRoom = function (room) {
        var url = urlcmd + globalSettings.room + room + globalSettings.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();
                connection.isDebug = true;
                $log.debug("HomeService by room");
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
                connection.isDebug = false;
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

    HomeService.getHomeByAdvice = function (device) {
        var url = urlcmd + globalSettings.genericDeviceType + device + globalSettings.param;
        $log.debug(url);
        $log.debug('connection.internet: ' + connection.internet);
        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
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

    HomeService.getHome = function (name, type) {

        var url = $rootScope.MetaDatafhemweb_url + globalSettings.cmd + type + '=' + name + globalSettings.param;
        $log.debug('getHome url: ' + url);
        $log.debug('name: ' + name + ' type: ' + type);
        return $http({
            method: 'GET',

            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("Success HomeService.getHome");
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
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

    HomeService.setFavorit = function (name, type) {

        var url = $rootScope.MetaDatafhemweb_url + '?cmd=attr%20' + name + '%20like%20' + type + globalSettings.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
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

    HomeService.setPreset = function (name, preset) {
        //set Cam_Demowand preset alarm
        var url = $rootScope.MetaDatafhemweb_url + '?cmd=%20set%20' + name + '%20preset%20' + preset + globalSettings.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService Camera set preset OK");
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
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

    HomeService.getHomeByIdJson = function (name) {
        var url = 'json/homewatch/data/' + name + '.json';
        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();
            })
            .error(function (err, status, headers, config) {

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

    HomeService.data = function () {
        return data;
    };
    return HomeService;
});
