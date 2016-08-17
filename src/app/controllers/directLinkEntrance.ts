
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
    else if ((window.location.pathname).indexOf('poisk') !== -1){
        $('#form').ready(function ($:any) {
            deleteRowListState();
            var qwert =  (window.location.pathname).split('/');
            //console.log(qwert[2]);
            $('.productCardTitle h1').attr('title',qwert[2]);
            $('.productCardTitle h1').html(qwert[2]);
            $('#breadcrumbsCategory1 a span').html('поиск по артикулу');

            new priceListLightViewUser();
            
            
            //new priceListLightViewUser();
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










