/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('Jsonervice', function ($http, notification, $log, $q, globalSettings, CacheService, connection) {
    var data = [];
    var deffered = $q.defer();
    var Jsonervice = {};
    var urlcmd = globalSettings.url + globalSettings.port + globalSettings.cmd;
    var originUrl = connection.originUrl;

    Jsonervice.getJson = function (name) {

        var url = 'json/homewatch/' + name + '.json';

        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("Jsonervice by Json " + name);
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {

                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == 404) {
                    url = originUrl + url;
                    $log.debug(url);
                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }


            });


    };

    Jsonervice.data = function () {
        return data;
    };
    return Jsonervice;
});
