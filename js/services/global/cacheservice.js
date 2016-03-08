/**
 * Created by Fabrice on 25.01.2016.
 */
myApp.service('CacheService', function ($log, $http, $cacheFactory) {

    var myCache = $cacheFactory("myServiceCache");
    $log.log(myCache.info());

    return {

        jsonCache: function (id, responder, name) {

            var params = {id: id};

            var config = {
                path: '/' + name,
                cache: myCache,
                method: 'GET',
                params: params
            };

            $http(config)
                .success(function (data, status, headers, config) {
                    $log.log(myCache.info());

                    if (responder && responder.result && typeof responder.result == "function")
                        responder.result(data);
                })
                .error(function (data, status, headers, config) {
                    if (responder && responder.fault && typeof responder.fault == "function")
                        responder.fault(data, status, headers, config);


                });
        }
    }
});