/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('CookiesService', function ($http, notification, $log, $q, HomeService, Jsonervice, $cookieStore) {
    {
        // set cookie with json
        this.setCookieJson = function (name) {
            let config = [];

            Jsonervice.getJson(name).then(function () {

                    config = Jsonervice.data();
                    localStorage.setItem(name, JSON.stringify(config));
                    $cookieStore.put(name, config);
                    return config;
                })
                .catch(function (callback) {
                    $log.debug(callback);

                });
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
            $cookieStore.put(name, data);
        };
        // get Cookie
        this.getCookie = function (name) {

            config = $cookieStore.get(name);
            return config;
        };

    }
});
