jQuery( document ).on( 'touchmove', function( ev )
{
    if (!jQuery( ev.target ).parents().hasClass( 'nav_down' ))
    {
         ev.preventDefault();
    }
})