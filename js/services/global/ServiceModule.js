/**
 * Created by B026789 on 12.01.2016.
 */
var service = angular.module('app.service', [])
    .service('DataService', function ($log, $http) {
        return {
            getWorkflow: function (id, responder) {
                var config = {
                    url: 'json/workflow.json',
                    cache: true,
                    method: 'GET'
                };

                $http(config)
                    .success(function (data, status, headers, config) {
                        if (responder && responder.result && typeof responder.result == "function")
                            responder.result(data);

                    })
                    .error(function (data, status, headers, config) {
                        if (responder && responder.fault && typeof responder.fault == "function")
                            responder.fault(data, status, headers, config);

                    })

            }
        }

    }());