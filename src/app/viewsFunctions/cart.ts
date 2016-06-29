
function getCartData(){
    return JSON.parse(localStorage.getItem('cartData'));}
function getCartDataCount(){
    return JSON.parse(localStorage.getItem('cartDataCount'));}
function setCartData(o: string){
    localStorage.setItem('cartData', JSON.stringify(o)); return false;}
function setCartDataCount(n: number){
    localStorage.setItem('cartDataCount', JSON.stringify(n)); return false;}
function emptyCart(){
    localStorage.clear(); cartInit(); openCart(); return false;}

function openCart(){
    var cartWrapper = $('.cartWrapper');
    if (!localStorage.getItem('cartData') || $.isEmptyObject(localStorage.getItem('cartData'))){
        cartWrapper.html('<div class="cartEmpty"><h1>В корзине нет товаров</h1></div>');
        cartInit();
    }
    else{
        var itemCartCount:any = getCartDataCount();
        var itemCartData:any = getCartData();
        var cartContent: string = "";
        $.each(itemCartData, function(itemId, values) {
            cartContent +=
                '<div class="cartContentItem">' +
                    '<div class="cartContentMainWrapper">' +
                        '<div class="cartContentImageWrapper"><img src="' + '/images/' + values[1] + '.png' + '" alt="' + values[1] + '"/></div>' +
                        '<div class="cartContentMainTitle"><a class="link linkThemeMinor pjaxProduct" href="/product/' + itemId + '">' + values[0] + '</a></div>' +
                        '<div class="cartContentMainShop"><a class="link linkShop" href="">' + values[4] + '</a>' +
                            '<div class="ratingStarsBlock">' +
                                '<div class="ratingStars" data-rate="' + values[5] + '">' +
                                    '<i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cartContentQuantityWrapper">' +
                        '<div class="cartContentQuantityBlock">' +
                            '<div class="cartContentQuantityMinusWrapper"><div class="cartContentQuantityMinus" data-uuid="' + itemId + '">' + '-' + '</div></div>' +
                            '<div class="cartContentQuantity"><span class="cartItemCountSumm">' +  values[6] + '</span></div>' +
                            '<div class="cartContentQuantityPlusWrapper"><div class="cartContentQuantityPlus" data-uuid="' + itemId + '">' + '+' + '</div></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cartContentPriceWrapper">' +
                        '<div class="cartContentPrice"><span class="cartPrice">' + values[2] + ' руб.' + '</span></div>' +
                        '<div class="cartContentItemDel" data-uuid="' + itemId + '"><img class="image" src="/images/del_gray50x50.png" alt="удалить" /></div>' +
                    '</div>' +
                '</div>'
        });
        cartWrapper.html(
            '<div class="cartHeader">' +
                '<div class="cartHeaderTitle"><h1>Корзина</h1></div>' +
                '<div class="cartHeaderQuantity">Количество</div>' +
                '<div class="cartHeaderPrice">Цена</div>' +
            '</div>' +
            '<div class="cartContent">' +
                cartContent +
            '</div>' +
            '<div class="cartFooter">' +
                '<div class="cartFooterSummary"><span class="cartText">Итого товаров:</span><span id="cartItemsCountSumm">' + itemCartCount[0] + '</span><span class="cartText">на сумму</span><span class="cartPrice"><span id="cartItemsPriceSumm">' + itemCartCount[1] + '</span><span class="cartText">руб.</span></span></div>' +
                '<div class="cartFooterButton"><a role="button" type="button" class="button buttonSizeM buttonThemeAction pjax toCheckout" href="/checkout"><span class="buttonText">Оформить заказ</span></a></div>' +
            '</div>' +
            '<div class="cartDopInfo">Информация о цене и наличии товара, а также о стоимости и условиях доставки является предварительной и будет уточнена в момент оформления и подтверждения заказа.</div>'
        );

        $('.cartContentItemDel').hover(
            function(){
                $(this).find('.image').attr('src','/images/del_red50x50.png').css({'cursor':'pointer'});
            },function(){
                $(this).find('.image').attr('src','/images/del_gray50x50.png').css({'cursor':'default'});
            });

        cartWrapper.on('click', '.cartContentItemDel', function (){
            var itemId: string;
            itemId = $(this).attr('data-uuid');
            itemCartCount[0] -= +itemCartData[itemId][6];
            itemCartCount[1] -= +itemCartData[itemId][2] * +itemCartData[itemId][6];
            delete itemCartData[itemId];

            if (!setCartDataCount(itemCartCount) && !setCartData(itemCartData)) {  // обновляем localStorage
            }
                if ($.isEmptyObject(itemCartData)){
                    localStorage.removeItem('cartData');
                    cartWrapper.html('<div class="cartEmpty"><h1>В корзине нет товаров</h1></div>');
                    cartInit();
                }
                else {
                    $(this).parent().parent().remove();
                    $('#cartItemsCountSumm').text(itemCartCount[0]);
                    $('#cartItemsPriceSumm').text(itemCartCount[1]);
                    cartInit();
                }
        });


        $('.cartContentQuantityPlusWrapper').hover(
            function(){
                $(this).find('.cartContentQuantityPlus').css({'visibility':'visible','cursor':'pointer'});
            },function(){
                $(this).find('.cartContentQuantityPlus').css({'visibility':'hidden','cursor':'default'});
            });


        $('.cartContentQuantityMinusWrapper').hover(
            function(){
                if ($(this).parent().find('.cartContentQuantity').text() > '1')
                {
                    $(this).find('.cartContentQuantityMinus').css({'visibility':'visible','cursor':'pointer'});
                }
            },function(){
                $(this).find('.cartContentQuantityMinus').css({'visibility':'hidden','cursor':'default'});
            }).trigger('mouseout');



        cartWrapper.on('click', '.cartContentQuantityPlus', function (){
            var itemId: string;
            itemId = $(this).attr('data-uuid');
            itemCartData[itemId][6] += 1;
            itemCartCount[0] += 1;
            itemCartCount[1] += +itemCartData[itemId][2];
            setCartData(itemCartData);
            setCartDataCount(itemCartCount);
            cartInit();
            $(this).parent().parent().find('.cartItemCountSumm').text(itemCartData[itemId][6]);
            $('#cartItemsCountSumm').text(itemCartCount[0]);
            $('#cartItemsPriceSumm').text(itemCartCount[1]);
            
        });
        cartWrapper.on('click', '.cartContentQuantityMinus', function (){
            var itemId = $(this).attr('data-uuid');
            itemCartData[itemId][6] -= 1;
            itemCartCount[0] -= 1;
            itemCartCount[1] -= +itemCartData[itemId][2];
            setCartData(itemCartData);
            setCartDataCount(itemCartCount);
            cartInit();
            $(this).parent().parent().find('.cartItemCountSumm').text(itemCartData[itemId][6]);
            $('#cartItemsCountSumm').text(itemCartCount[0]);
            $('#cartItemsPriceSumm').text(itemCartCount[1]);

            if ($(this).parent().parent().find('.cartContentQuantity').text() == '1'){
                $(this).css({'visibility':'hidden','cursor':'default'});
            }


        });

    }
    return false;
}



