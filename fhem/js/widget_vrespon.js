  (function($) {
    var $window = $(window),

        $html = $('html');

    function resize() {

     
        if ($window.width() < 738) {

      $('#myelement').removeClass('small').addClass('mini');

      $('#myelement2').removeClass('small').addClass('mini');


        

      $('#myelement3').removeClass('small').addClass('mini');
      $('#myelement4').removeClass('small').addClass('mini');        

        }
        
        if ($window.width() > 600) {


        $('#myelement').show(); 


        };

        //$html.removeClass('mobile');
    }

    $window
        .resize(resize)
        .trigger('resize');




})(jQuery);