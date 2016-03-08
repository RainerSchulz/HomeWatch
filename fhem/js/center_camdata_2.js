
window.onload = function() {
	 $(function(){
    $(window).resize(function (){
        $('.clas_center').css({
            position:'relative',
            
            top: ($(window).height() - $('.className').outerHeight())/6
        });
    });
    $(window).resize();
});

   } 
    
