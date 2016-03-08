
    $(document).ready(function (){
    $(window).resize(function (){
        $('.clas_center').css({
            position:'relative',
            
            top: ($(window).height() - $('.className').outerHeight())/10
        });
    });
    $(window).resize();
});

    
    
    