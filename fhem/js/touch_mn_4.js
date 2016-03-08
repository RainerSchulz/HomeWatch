jQuery( document ).on( 'touchmove', function( ev )
 {	if($(window).width() > 376){
     if (!jQuery( ev.target ).parents().hasClass( 'touch-moveable1' ))
     {
          ev.preventDefault();
     }
     }
 })

    

    

