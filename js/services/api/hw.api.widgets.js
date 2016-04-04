/**
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("WidgetService", function ($http, $rootScope, $log, $q) {
    "use strict";
    var widgets = [];
    return {
        getWidget: function (type, name) {
            var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
            $log.debug('WidgetService.getWidget url: ' + url);
            $log.debug('name: ' + name + ' type: ' + type);
            return $http.get(url);
        }
    }

});
