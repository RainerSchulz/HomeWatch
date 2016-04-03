/**
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("FillAllDataService", function ($q, $log, $rootScope, $http, HomeService, CookiesService, WidgetService, globalSettings) {
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
                var globals = CookiesService.getCookie('globals');
                if (globals.home) {
                    var home = globals.home;
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
                    var results = [];
                    angular.forEach(values, function (name) {
                        var deffered  = $q.defer();
                        var url = $rootScope.MetaDatafhemweb_url + globalSettings.cmd + type + '=' + name + globalSettings.param;
                        $log.debug('WidgetService.getWidget url: ' + url);
                        $log.debug('name: ' + name + ' type: ' + type);
                        // get json list
                        HomeService.getHome(name, type).then(function () {
                            var data = HomeService.data();
                            // promise successfully resolved
                            deffered.resolve(data.Results);

                            if (data.Results.length > 0) {
                                $log.debug('WidgetService.getWidget add Widgets: ' + type + ' : ' + name + ' - ' + data.Results.length);
                                $log.debug(data.Results);

                            }

                        });
                        promises.push(deffered);

                    });

                    $q.all(promises).then(function (values) {
                        CookiesService.setCookieName(cookie, values);
                        return values;
                    });

                }

            }

        },
        getWidget: function homeWidgets(names, type) {
            // create a $q deferred promise
            let deferred = $q.defer();
            var results = [];
            var values = names.split(',');

            angular.forEach(values, function (value) {
                var promise = WidgetService.getWidget(type, value);
                promise.then(
                    function (response) {
                        results.push(response.data.Results);
                    },
                    function (error) {
                        $log.error('failure loading widgets', error);
                    });

            });
            return results;
        },
        // add Widget to cookie
        addWidgetToCookie: function (name, widget) {
            CookiesService.setCookieName(name, widget);
        }

    }
});