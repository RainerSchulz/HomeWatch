/**
 * Created by B026789 on 16.12.2015.
 */
angular.module('myApp')
    .directive('cndLoginDialog', function factory($log, AUTH_EVENTS) {
        var directiveDefinitionObject = {
            restrict: 'A',
            templateUrl: 'templates/login/index.html',

            link: function (scope) {
                var showDialog = function () {
                    scope.visible = true;
                };

                scope.visible = false;
                scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
            }
        };

        return directiveDefinitionObject;
    })
;