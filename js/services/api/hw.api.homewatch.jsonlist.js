/**
 * Created by RSC on 05.04.2016.
 */

myApp.factory('HomeWatchFactory', function ($http, $q, $rootScope, $log) {

    return {
        getFhemJsonList: function (name, type) {

            var url = '';
            if ($rootScope.config.connection.isDebug) {
                url = 'json/homewatch/data/' + name + '.json';
            } else {
                url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
            }
            $log.debug('HomeWatchFactory: ' + url);
            var deferred = $q.defer();
            $http({method: "GET", url: url})
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        getJson: function (name) {
            var url = 'json/homewatch/' + name + '.json';

            var deferred = $q.defer();
            $http({method: "GET", url: url})
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        },
        getLocationWidgets: function (location) {
// no values
            if (angular.isUndefined(location) || location == '') {
                $log.debug('HomeWatchFactory.getLocationWidgets: location isUndefined');
                return;
            }

            var widget = $rootScope.config.home;
            if (widget.length == 0)
                return;

            var deferred = $q.defer();

            var len = widget.length;
            for (var i = 0; i < len; i++) {
                if (widget[i].location == location) {
                    data = widget[i];
                    deferred.resolve(data);
                    break;
                }
            }
            return deferred.promise;

        }
    };
});
