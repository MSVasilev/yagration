function pjaxNavigation() {
    $(document).on('click','.pjaxProduct', function(){                                  //ajax переход на карточку товара
        //noinspection TypeScriptValidateTypes
        $.pjax({url: $(this).attr('href'), container: '#pjax', fragment: '#pjax'});
        $(document).one('pjax:beforeReplace', '#pjax', function() {
            productCardGetJSON(123);
        });
        $(document).one('pjax:end.caseProduct', '#pjax', function() {
            productCardMenuStick();
            productCardFooterMenu();
            productCardImageSelection();
            productCardShowYandexMap();
        });
        return false;
    });

    $(document).on('click','.pjax', function(){                                         //ajax переход на страницу списка товаров(каталог)
        $(document).off('.productCardFooterMenuNamepace');
        //noinspection TypeScriptValidateTypes
        $.pjax({url: $(this).attr("href"), container: '#pjax', fragment: '#pjax'});
        return false;
    });

    $(document).on('click','.cartBasket', function(){                                   //ajax переход в корзину
        $(document).off('.productCardFooterMenuNamepace');
        //noinspection TypeScriptValidateTypes
        $.pjax({url: $(this).attr("href"), container: '#pjax', fragment: '#pjax'});
        $(document).one('pjax:success', '#pjax', function() {
            openCart();
        });
        return false;
    });

    $(document).on('click','.toCheckout', function(){                                   //ajax переход в корзину
        $(document).off('.productCardFooterMenuNamepace');
        //noinspection TypeScriptValidateTypes
        $.pjax({url: $(this).attr("href"), container: '#pjax', fragment: '#pjax'});
        $(document).one('pjax:success', '#pjax', function() {
            checkout();
        });
        return false;
    })
    



}