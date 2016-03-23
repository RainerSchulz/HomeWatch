/**
 * Created by B026789 on 16.12.2015.
 */
angular.module('myApp')
    .directive('cndNavigationsLeft', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_left: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.sidebar_left = JSON.parse($scope.ngNavButton);
                $log.debug('Start NavigationsLeft');
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

                $q.all($rootScope.rooms).then(function(rooms) {
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
                //$log.debug($scope.rooms);
                $scope.buttonClick = function (room) {
                    alert('cndNavigationsLeftHome: ' + room);
                    $rootScope.currentRoom = room;

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRight', function factory($log, $rootScope, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navRight: {},

            scope: {
                ngNavRight: "@"
            },

            link: function ($scope, element, attrs) {
                $log.debug('Start NavigationsRight');
                if ($scope.ngNavRight != '') {

                    $scope.navRight = JSON.parse($scope.ngNavRight);
                }

                $scope.buttonClick = function (item) {
                    $rootScope.Link = item.Internals.LINK;
                    $log.debug('Url: ' + item.Internals.LINK);
                    $log.debug('Location: ' + item.Attributes.icon);
                    if (item.Internals.LINK != '') {
                        // $window.location.href = item.url;
                        $window.open(item.Internals.LINK)
                    } else {
                        $location.path(item.Attributes.icon);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRightTop', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/top/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navRightTop: {},

            scope: {
                ngNavRightTop: "@"
            },

            link: function ($scope, element, attrs) {
                if ($scope.ngNavRightTop != '') {
                    $scope.navRightTop = JSON.parse($scope.ngNavRightTop);
                }

                $scope.buttonClick = function (item) {
                    if (item.target != '') {
                        $log.debug('Url: ' + item.url);
                        // $window.location.href = item.url;
                        $window.open(item.url, item.target)
                    } else {
                        $log.debug('Location: ' + item.location);
                        $location.path(item.location);
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

;