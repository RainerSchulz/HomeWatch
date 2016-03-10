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
    .directive('cndNavigationsRight', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);

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
    .directive('cndNavigationsLeftHome'', ['$compile', function factory($compile,$log, $location, $window, RoomService) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left_home/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@",
                ngHeaderImage: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);
                $scope.rooms = RoomService.getRooms($scope.navButton);
                $log.debug($scope.rooms);

                $scope.headerImage = $scope.ngHeaderImage;
                $log.debug('Start left home nav: ' + $scope.headerImage);
                $log.debug($scope.navButton);
                $scope.buttonClick = function (item) {


                }
            }
        };

        return directiveDefinitionObject;
    }])
    .directive('cndNavigationsRightTop', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index_top.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);

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