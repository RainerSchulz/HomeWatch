/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('CookiesService', function ($http, notification, $log, $q, $rootScope, HomeWatchFactory, $cookieStore) {
    {
        // set cookie with json
        this.setCookieJson = function (name) {
            let config = [];

            config = HomeWatchFactory.getJson(name);
            //the model returns a promise and THEN items
            config.then(function (data) {
                config = data;
                localStorage.setItem(name, JSON.stringify(config));
                $cookieStore.put(name, config);
                $rootScope.config = config;
            }, function (status) {
                $log.debug(status);
            });
            $log.debug('CookiesService setCookieJson: ' + name);
        };
        // set cookie with name and data
        this.setCookieName = function (name, data) {
            if (angular.isUndefined(name))
                return;
            // check cookie

            config = $cookieStore.get(name) || {};
            if (config.length > 0) {
                $cookieStore.remove(name);
                localStorage.removeItem(name);
            }
            localStorage.setItem(name, JSON.stringify(data));
            $cookieStore.put(name, JSON.stringify(data));

            $log.debug('CookiesService setCookieName: ' + name);
        };

        // get Cookie
        this.getCookie = function (name) {
            config = $cookieStore.get(name) || {};
            if (!config.globals) {
                $log.debug('CookiesService getCookie: ' + name);
                $log.debug(config);
            }
            
            return config;
        };

    }
});
