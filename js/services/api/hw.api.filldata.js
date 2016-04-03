/**
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("FillAllDataService", function ($q, HomeService, CookiesService, WidgetService) {
    "use strict";
    var data = [];
    var widget = {};
    return {
        loadWidgets: function (cookie) {
            widget = CookiesService.getCookie(cookie) || {};
            if (!widget.alias) {
                // get type and name from cookie global.home
                var globals = CookiesService.getCookie('globals');
                if (globals.home) {
                    var home = globals.home;
                    var type = '';
                    var name = '';
                    for (var i = 0; i < home.length; i++) {
                        if (home[i].alias == cookie) {
                            type = home[i].type;
                            name = home[i].name;
                            break;
                        }
                    }
                    // get widget
                    widget = getWidget(name, type);
                    if (widget) {
                        CookiesService.setCookieName(cookie, widget);
                        return widget;
                    }
                }

            }

            return widget;
        },
        getWidget: function homeWidgets(values, type) {
            // create a $q deferred promise
            var deferred = $q.defer();
            var results = [];
            angular.forEach(values, function (value) {
                var data = WidgetService.getWidget(type, value);
                // promise successfully resolved
                deferred.resolve(data);

                if (data.Results.length > 0) {
                    $log.debug('FillAllDataService getWidget add Widgets: ' + type + ' : ' + value + ' - ' + data.Results.length);
                    $log.debug(data.Results);
                    results.push(data.Results);
                }

            })
        },
        // add Widget to cookie
        addWidgetToCookie: function (name, widget) {


        }

    }
});