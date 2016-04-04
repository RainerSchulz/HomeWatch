/**
 * Created by Rainer on 09.03.2016.
 */
'use strict';
myApp.service('RoomService', function ($http, notification, $log) {
    this.getRooms = function (jsondata) {
        let rooms = [];
        let room = '';

        angular.forEach(jsondata, function (obj, ids) {
            angular.forEach(obj.Results, function (obj, idx) {
                if (obj == 0 || angular.isUndefined(obj.Attributes.room)) {
                    $log.debug('RoomService.getRooms: room isUndefined');
                }
                else {
                    room = obj.Attributes.room;
                    var index = -1;
                    for(var i = 0, len = rooms.length; i < len; i++) {
                        if (rooms[i].room === room) {
                            index = i;
                            break;
                        }
                    }

                    if (index == -1) {
                        rooms.push({
                            room: room
                        });
                    }
                    else {
                        $log.debug('room is in array = ' + room);
                    }
                }

            });
        });

        return rooms;
    };
});
/**
 * Created by RSC on 24.03.2016.
 */
'use strict';
myApp.service('HomeWidgetsService', function ($http, notification, $log, $q, Jsonervice, HomeService) {
    this.getHomeWidgets = function (homeLocation) {
        let widgets = [];
        var name = '';
        var type = '';

        // no values
        if (angular.isUndefined(homeLocation) || homeLocation == '') {
            $log.debug('HomeWidgetsService.getWidgets: home isUndefined');
            return;
        }

        // get values from home.json
        // "homeLocation": "Beleuchtung",
        // "name": "light_hm,dimmer_hm,light_gira,dimmer_gira,light",
        // "type": "genericDeviceType"
        Jsonervice.getJsonById('home', homeLocation).then(function () {
                var data = Jsonervice.data();
                name = data.name;
                type = data.type;

                // get all Widgets
                widgets = this.getWidgets(name, type);
            })
            .catch(function (callback) {
                $log.debug(callback);
            });

        // return all Widgets
        return widgets;

        function getWidgets(name, type) {
            var result = [];

            // no values
            if (angular.isUndefined(name) || name == '') {
                $log.debug('HomeWidgetsService.getWidgets: name isUndefined');
                return;
            }

            // get all values from Service
            // "name": "light_hm,dimmer_hm,light_gira,dimmer_gira,light",
            // "type": "genericDeviceType"
            var values = name.split(',');

            angular.forEach(values, function (value) {

                // get from Service
                let data = $q.defer();

                // check if isDebug mode
                if ($rootScope.config.connection.isDebug) {
                    data.resolve(this.getJson(value));
                } else {
                    data.resolve(this.getHome(value, type));
                }

            });

            return data.promise;
        }

        // get data from service
        function getHome(value, type) {
            let results = [];
            $log.debug('HomeWidgetsService getHome: ' + value + ' - ' + type);

            HomeService.getHome(value, type).then(function () {

                    var data = HomeService.data();
                    // check if widget has values
                    if (data.Results.length > 0) {
                        $log.debug('data.Results.length: ' + data.Results.length);
                        results = data.Results;
                        return results;
                    }
                })
                .catch(function (callback) {
                    $log.debug(callback);
                });
        }

        // get data from json-file
        function getJson(value) {
            let results = [];

            $log.debug('HomeWidgetsService getJson: ' + value);

            HomeService.getHomeByIdJson(value).then(function () {
                    var data = HomeService.data();
                    // check if widget has values
                    if (data.Results.length > 0) {
                        $log.debug('data.Results.length: ' + data.Results.length);
                        results = data.Results;
                        return results;
                    }
                })
                .catch(function (callback) {
                    $log.debug(callback);
                });
        }
    };

    this.getHomeSidebar = function (sidebar) {
        let results = [];

        // no values
        if (angular.isUndefined(sidebar) || sidebar == '') {
            $log.debug('ERROR: HomeWidgetsService.getHomeSidebar: sidebar isUndefined');
            return;
        }

        // get values sidebar
        // "sidebar": "siedebar_left",
        HomeService.getHomeByRoom(sidebar).then(function () {
                var data = Jsonervice.data();
                if (data.Results.length > 0) {
                    $log.debug('HomeWidgetsService getHomeSidebar: ' + sidebar + ' = ' + data.Results.length);
                    $log.debug(data.Results);
                    results = data.Results;
                    return results;
                }

            })
            .catch(function (callback) {
                $log.debug(callback);
            });
        
        // get results
        return results;

    };

});