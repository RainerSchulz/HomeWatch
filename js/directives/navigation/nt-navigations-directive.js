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
            navButton: {},

            scope: {
                ngNavButton: "@"
            },

            /* ,compile: function compile(tElement, tAttrs, transclude){

             return ($scope, element, attrs){

             };
             }*/

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);
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
    .directive('cndNavigationsRooms', function factory($compile, $log, $location, $window, RoomService) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left_home/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            rooms: {},

            scope: {
                ngRooms: "@",
                ngHeaderImage: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.rooms = JSON.parse($scope.ngRooms);
                //$scope.rooms = RoomService.getRooms($scope.rooms);
                $log.debug($scope.rooms);

                $scope.headerImage = $scope.ngHeaderImage;
                $log.debug('Start left home nav: ' + $scope.headerImage);
                $log.debug($scope.rooms);
                $scope.buttonClick = function (item) {
                    alert('cndNavigationsLeftHome');

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
                if ($scope.ngNavRight != '') {
                    $log.debug('Start NavigationsRight');
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
            templateUrl: 'templates/navigation/right/index_top.html',
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