/**
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("WidgetService", function ($http, $rootScope, $log, globalSettings) {
    "use strict";
    var widgets = [];
    return {
        getWidget: function (type, name) {
            var url = $rootScope.MetaDatafhemweb_url + globalSettings.cmd + type + '=' + name + globalSettings.param;
            $log.debug('WidgetService.getWidget url: ' + url);
            $log.debug('name: ' + name + ' type: ' + type);
            $http.get(url).then(
                function (response) {
                    return response.data
                },
                function (error) {
                    $log.debug(error);
                }
            );

        }
    }

});