/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('Jsonervice', function ($http, notification, $log, $q, CacheService, connection) {
    var data = [];
    var deffered = $q.defer();
    var Jsonervice = {};
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

    Jsonervice.getJsonById = function (name, id) {

        var url = 'json/homewatch/' + name + '.json';

        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                var res = d;

                var len = res.Results.length;
                for (var i = 0; i < len; i++) {
                    if (res.Results[i].location == id) {
                        data = res.Results[i];
                        deffered.resolve();
                        break;
                    }
                }


                $log.debug("Jsonervice by getJsonById " + id);
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
