/**
 * Created by Rainer on 09.03.2016.
 */

myApp.service('RoomService', function ($http, notification, $log) {


    this.getRooms = function (jsondata) {
        var values = [];
        var room = '';
        var data = jsondata;

        angular.forEach(data, function (rooms, ids) {
            angular.forEach(rooms, function (obj, idx) {
                if (obj == 0 || angular.isUndefined(obj.Attributes.room)) {
                    $log.debug('room isUndefined');
                }
                else {
                    room = obj.Attributes.room;
                    var index = values.indexOf({room: room});
                    $log.debug(index);
                    if (index == -1) {
                        values.push({
                            room: room
                        });

                        $log.debug('room = ' + room);
                    }
                    else {
                        $log.debug('room is in array = ' + room);
                    }
                }

            });
        });

        return values;
    };
});