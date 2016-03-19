/**
 * Created by Rainer on 09.03.2016.
 */
'use strict';
myApp.service('RoomService', function ($http, notification, $log) {


    this.getRooms = function (jsondata) {
        let rooms = [];
        let room = '';

        angular.forEach(jsondata, function (obj) {
            angular.forEach(obj.Results, function (obj) {
                if (obj == 0 || angular.isUndefined(obj.Attributes.room)) {
                    $log.debug('room isUndefined');
                }
                else {
                    room = obj.Attributes.room;
                    var index = rooms.indexOf(room);
                    $log.debug(index);
                    if (index == -1) {
                        rooms.push(room);

                        $log.debug('room = ' + room);
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