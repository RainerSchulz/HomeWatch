if(typeof widget_famultibutton == 'undefined') {
    loadplugin('widget_famultibutton');
}

var widget_push = $.extend({}, widget_famultibutton, {
   widgetname : 'push',
   startTimer: function ($elem,secondes){
        var count = secondes;
        var $elm = $elem.data('famultibutton');
        if ($elm){
          $elm.setProgressValue(1);
          $elm.data('countdown',setInterval(function(){
            if (count-- <= 0) {
              clearInterval($elm.data('countdown'));
            }
            $elm.setProgressValue(count/secondes);
          }, 1000));
        }
    },
    init: function () {
        var base = this;
        this.elements = $('div[data-type="'+this.widgetname+'"]');
        this.elements.each(function(index) {
            $(this).data('device',          $(this).data('device')          || ' ');
            $(this).data('off-color',       $(this).data('off-color')       || '#505050');
            $(this).data('on-color',        $(this).data('on-color')        || '#AF0539');
            $(this).data('background-icon', $(this).data('background-icon') || 'fa-circle-thin');
            $(this).data('set-on',          $(this).data('set-on')          || '');
            $(this).data('set-off',         $(this).data('set-off')         || '');
            $(this).data('mode', 'push');
            base.init_attr($(this));
            base.init_ui($(this));
            var elem = $(this); var secondes;
            $(this).bind("toggleOn", function( event ){
                if (elem.data("set-on") && getPart(elem.data("set-on"),1)=="on-for-timer")
                    secondes = getPart(elem.data("set-on"),2);
                if (elem.data("countdown"))
                    secondes = elem.data("countdown");
                if (secondes && $.isNumeric(secondes)){
                     widget_push.startTimer(elem,parseInt(secondes));
                }
            });
        });
    },
    update: function (dev,par) {},
});
