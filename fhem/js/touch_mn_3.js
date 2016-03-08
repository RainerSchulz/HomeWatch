jQuery( document ).on( 'touchmove', function( ev )
 {	if($(window).width() > 700){
     if (!jQuery( ev.target ).parents().hasClass( 'touch-moveable' ))
     {
          ev.preventDefault();
     }
     }
 })

    

    

