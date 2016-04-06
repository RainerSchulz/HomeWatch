/**
 * Created by B026789 on 16.12.2015.
 */
angular.module('myApp')
    .directive('cndSidebar_Preference', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/preference/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_preference: {},

            scope: {
                ngSidebarPreference: "@"
            },
            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.sidebar_preference = JSON.parse($scope.ngSidebarPreference);
                    $log.debug('Start Sidebar_Preference');
                },
                post: function postLink($scope, element, attrs, controller) {
                    i$scope.buttonClick = function (item) {
                        if (item.Internals.LINK != '') {
                            $log.debug('Url: ' + item.Internals.LINK);
                            // $window.location.href = item.url;
                            $window.open(item.Internals.LINK, item.target)
                        } else {
                            $log.debug('Location: ' + item.Attributes.icon);
                            $location.path(item.Attributes.icon);
                        }

                    };
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsLeft', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_left: {},

            scope: {
                ngSidebarLeft: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.sidebar_left = JSON.parse($scope.ngSidebarLeft);
                $log.debug('Start NavigationsLeft ' + $scope.sidebar_left.length);
                $scope.buttonClick = function (item) {
                    if (item.Internals.LINK != '') {
                        $log.debug('Url: ' + item.Internals.LINK);
                        // $window.location.href = item.url;
                        $window.open(item.Internals.LINK, item.target)
                    } else {
                        $log.debug('Location: ' + item.Attributes.icon);
                        $location.path(item.Attributes.icon);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRight', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_right: {},

            scope: {
                ngSidebarRight: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.sidebar_right = JSON.parse($scope.ngSidebarRight);
                $log.debug('Start NavigationsRight ' + $scope.sidebar_right.length);
                $scope.buttonClick = function (item) {
                    if (item.Internals.LINK != '') {
                        $log.debug('Url: ' + item.Internals.LINK);
                        // $window.location.href = item.url;
                        $window.open(item.Internals.LINK, item.target)
                    } else {
                        $log.debug('Location: ' + item.Attributes.icon);
                        $location.path(item.Attributes.icon);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRightTop', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right_top/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_right_top: {},

            scope: {
                ngSidebarRightTop: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.sidebar_right_top = JSON.parse($scope.ngSidebarRightTop);
                $log.debug('Start NavigationsRightTop ' + $scope.sidebar_right_top.length);
                $scope.buttonClick = function (item) {
                    if (item.Internals.LINK != '') {
                        $log.debug('Url: ' + item.Internals.LINK);
                        // $window.location.href = item.url;
                        $window.open(item.Internals.LINK, item.target)
                    } else {
                        $log.debug('Location: ' + item.Attributes.icon);
                        $location.path(item.Attributes.icon);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsTop', function factory($log, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/top/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            header: 'Liegenschaften',
            location: '/Liegenschaften',

            scope: {
                ngHeader: "@",
                ngLocation: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.header = $scope.ngHeader;
                $scope.location = $scope.ngLocation;

                $scope.goBack = function () {
                    $window.history.back();
                }
            }
        };


        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRooms', function factory($compile, $log, $location, $window, RoomService, $rootScope, $q) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left_rooms/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            rooms: {},

            scope: {
                ngHeaderImage: "@"
            },

            link: function ($scope, element, attrs) {

                $q.all($rootScope.rooms).then(function (rooms) {
                        $scope.rooms = rooms.promise;
                        $log.debug($scope.rooms);
                    },
                    // error
                    function (response) {
                        $log.debug('Failed: ' + response);
                    }
                );

                $scope.headerImage = $scope.ngHeaderImage;
                $log.debug('Start left home nav: ' + $scope.headerImage);
                $scope.buttonNavClick = function (room) {
                    $log.debug(room);
                    $rootScope.currentRoom = room;
                    $scope.isActive = 'active';
                    //jcu
                    $rootScope.filterRoom = [room.room];
                };

                $scope.buttonNavDisplayAllClick = function () {
                    //jcu
                    $rootScope.filterRoom = [];
                    $rootScope.currentRoom = [];
                };

                $scope.isActiveTab = function (room) {
                    //alert(room);
                    if (angular.isUndefined($rootScope.currentRoom.room)) {
                        return false;
                    }

                    var res = room == $rootScope.currentRoom.room;

                    return res;
                };
            }
        };

        return directiveDefinitionObject;
    })

;