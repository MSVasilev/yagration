
function checkout(){
    var checkoutWrapper = $('.checkoutWrapper');
    if (!localStorage.getItem('cartData') || $.isEmptyObject(localStorage.getItem('cartData'))){
        checkoutWrapper.html(
            '<div class="checkoutHeader"><h1>Оформление заказа</h1></div>' +
            '<div class="checkoutContent">' +
                '<h2>Нет товаров для заказа</h2>' +
                '<a role="button" type="button" class="button buttonSizeM buttonThemeAction pjax" href="/"><span class="buttonText">Перейти к выбору товаров</span></a>' +
            '</div>'
        );
    }
    else{
        var itemCartCount:any = getCartDataCount();             // для чекаута и оплаты потом переделать (брать данные с сервера)
        var itemCartData:any = getCartData();
        var cartContent: string = "";
        $.each(itemCartData, function(itemId, values) {
            cartContent +=
                '<div class="checkoutContentItem">' +
                    '<div class="checkoutContentMainWrapper">' +
                        '<div class="checkoutContentImageWrapper"><img src="' + '/images/' + values[1] + '.png' + '" alt="' + values[1] + '"/></div>' +
                        '<div class="checkoutContentMainTitle"><span>' + values[0] + '</span></div>' +
                    '</div>' +
                    '<div class="checkoutContentQuantityWrapper">' +
                        '<div class="checkoutContentQuantityBlock">' +
                            '<div class="checkoutContentQuantity"><span class="checkoutItemCountSumm">' +  values[6] + '</span><span>шт.</span></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="checkoutContentPriceWrapper">' +
                        '<div class="checkoutContentPrice"><span class="checkoutPrice">' + values[2] + ' руб.' + '</span></div>' +
                    '</div>' +
                '</div>'
        });
        checkoutWrapper.html(
            '<div class="checkoutHeader"><h1>Оформление заказа</h1></div>' +
            '<div class="checkoutContent">' +
                cartContent +
            '</div>' +
            '<div class="checkoutMain">' +
                '<div class="checkoutMainData">способы поставки' +
                '</div>' +
                '<div class="checkoutMainPayment">оплата' +
                '</div>' +
            '</div>' +
            '<div class="checkoutBottomPolicy">' +
                '<input id="policyCheckbox" type="checkbox" checked="checked"/><label for="policyCheckbox">Я принимаю</label><span id="policyLink"><a class="link linkThemeMinor" target="_blank" href="">условия использования сервиса</a></span> '+
            '</div>'

        );


    }
    return false;
}
