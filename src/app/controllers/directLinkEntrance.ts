
$(document).ready(function(){
    pjaxNavigation();
    cart();
    cartInit();
    if ((window.location.pathname).indexOf('product') !== -1){
        $('#pjax').ready(function() {
            productCardGetJSON(123); //model
            
            productCardMenuStick();
            productCardFooterMenu();
            productCardImageSelection();
            productCardShowYandexMap();
        });
    }
    else if ((window.location.pathname).indexOf('catalog') !== -1){

    }
    else if ((window.location.pathname).indexOf('cart') !== -1){
        $('#pjax').ready(function() {
            openCart();
        });
    }
    else if ((window.location.pathname).indexOf('checkout') !== -1){
        $('#pjax').ready(function() {
            checkout();
        });
    }
    else{
        
        
    }
   
    
});










