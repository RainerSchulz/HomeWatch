(function ($) {
    var $window = $(window),

        $html = $('html');

    function resize() {

        if ($window.width() < 738) {

            $('div[data-type="volume"]').removeClass('small').addClass('mini');
        }

        if ($window.width() > 600) {
            $('div[data-type="volume"]').show();
        }

    }

    $window
        .resize(resize)
        .trigger('resize');


})(jQuery);