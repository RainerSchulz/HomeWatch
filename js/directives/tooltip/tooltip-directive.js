/**
 * Created by B026789 on 18.12.2015.
 */
(function () {
    "use strict";

    var dirTooltip = angular.module('tooltip', [])
        .directive('tooltip', function factory($log) {
            return {
                restrict: 'A',

                link: function (scope, element, attrs) {

                    $(element).hover(function () {
                        // on mouseenter
                        $(element).tooltip('show');
                    }, function () {
                        // on mouseleave
                        $(element).tooltip('hide');
                    });
                }
            };
        });
}());