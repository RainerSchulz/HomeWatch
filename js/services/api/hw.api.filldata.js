/**
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("FillAllDataService", function ($q, $log, $rootScope, $http, HomeService, CookiesService, WidgetService) {
    "use strict";

    var widget = {};
    return {
        loadWidgets: function (cookie) {
            widget = CookiesService.getCookie(cookie) || {};
            if (widget && widget.length && widget.length > 0) {
                return widget;
            }
            else {
                // get type and name from cookie global.home
                var config = CookiesService.getCookie('config');
                if (config.home) {
                    var home = config.home;
                    var type = '';
                    var names = '';
                    // check alias name
                    for (var i = 0; i < home.length; i++) {
                        if (home[i].alias == cookie) {
                            type = home[i].type;
                            names = home[i].name;
                            break;
                        }
                    }

                    // get widget
                    let promises = [];

                    var values = names.split(',');
                    angular.forEach(values, function (name) {

                        var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
                        $log.debug('WidgetService.getWidget url: ' + url);
                        $log.debug('name: ' + name + ' type: ' + type);

                        var deffered = $q.defer();

                        $http({
                            url: url,
                            method: 'GET'
                        }).success(function (data) {
                            deffered.resolve(data.Results);
                        }).error(function (error) {
                            deffered.reject();
                        });

                        /*
                         HomeService.getHome(name, type).then(function () {
                         var data = HomeService.data();
                         deffered.resolve(data.Results);

                         if (data.Results.length > 0) {
                         $log.debug('WidgetService.getWidget add Widgets: ' + type + ' : ' + name + ' - ' + data.Results.length);
                         $log.debug(data.Results);

                         }

                         });
                         */

                        promises.push(deffered);

                    });

                    return $q.all(promises).then(function (values) {
                        CookiesService.setCookieName(cookie, values);
                    });

                }

            }

        },
        getWidget: function homeWidgets(names, type) {

            // create a $q deferred promise
            let deferred = $q.defer();
            var promises = [];
            var values = names.split(',');

            angular.forEach(values, function (name) {
                var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
                promises.push($http.get(url));
            });

            $q.all(urlCalls)
                .then(
                    function (results) {
                        deferred.resolve(
                            JSON.stringify(results))
                    },
                    function (errors) {
                        deferred.reject(errors);
                    },
                    function (updates) {
                        deferred.update(updates);
                    });
            return deferred.promise;
        },
        // add Widget to cookie
        addWidgetToCookie: function (name, widget) {
            CookiesService.setCookieName(name, widget);
        }

    }
});