
function addToCart(){
    var $that = $(this),
        cartData = getCartData() || {},                     // получаем данные корзины или создаём новый объект, если данных еще нет
        itemId = $that.attr('data-uuid'),                   // ID товара
        itemTitle = $that.attr('data-name'),                // название товара
        itemImageUrl = $that.attr('data-img'),              // путь к фото товара
        itemPrice = $that.attr('data-price'),               // цена товара
        shopId = $that.attr('data-shopid'),                 // ID магазина
        shopTitle = $that.attr('data-shop'),                // название машазина(точки)
        shopRating = $that.attr('data-shopra'),             // рейтинг магазина
        cartDataCount = getCartDataCount() || {},           // общее кол-во товара в заказе,
        itemCount = 'itemCount',                            // общее кол-во товара в заказе
        priceCount = 'priceCount';                          //общая сумма заказа
    $that.prop('disabled', true);                           // блокируем кнопку на время операции с корзиной
    if(localStorage.getItem('cartDataCount')){
        if(cartData.hasOwnProperty(itemId)){                // если такой товар уже в корзине, то добавляем +1 к его количеству
            cartData[itemId][6] += 1;
        }
        else {                                              // если товара в корзине еще нет, то добавляем в хранилище
            cartData[itemId] = [itemTitle, itemImageUrl, itemPrice, shopId, shopTitle, shopRating, 1];
        }
        cartDataCount[0] += 1;                              // добавляем +1 к общему количеству товара в корзине и стоимость товара к общей сумме заказа
        cartDataCount[1] = +cartDataCount[1] + +cartData[itemId][2];
    }
    else {
        cartData[itemId] = [itemTitle, itemImageUrl, itemPrice, shopId, shopTitle, shopRating, 1];
        cartDataCount = [1, +cartData[itemId][2]]
    }

    if (!setCartDataCount(cartDataCount) && !setCartData(cartData)) {  // обновляем localStorage
        cartInit();
    }

    $('#pjax').append(
        '<div id="popupCartWrapper">' +
        '<div id="popupCart" class="popupCartWindow">' +
        '<div class="popupCartTop">' +
        '<div class="popupCartImageWrapper"><img src="' + '/images/' + $(this).attr('data-img') + '.png' + '" alt="' + $(this).attr('data-name') + '"/></div>' +
        '<div class="popupCartContentTopWrapper">' +
        '<h2>Товар добавлен в корзину</h2>' +
        '<div class="popupCartContentTopTitle">' + $(this).attr('data-name') + '</div>' +
        '<div class="popupCartContentTopPrice">' + $(this).attr('data-price') + ' руб.' + '</div>' +
        '<div class="popupCartContentTopShop"><a class="link linkShop" href="">' + $(this).attr('data-shop') + '</a>' +
        '<div class="ratingStarsBlock">' +
        '<div class="ratingStars" data-rate="' + $(this).attr('data-shopra') + '">' +
        '<i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i><i class="ratingStar" data-rate-name=""></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="popupCartContentBottomWrapper">' +
        '<div class="popupCartButton"><a role="button" type="button" class="button buttonSizeM buttonThemeAction pjax toCheckout" href="/checkout"><span class="buttonText">Оформить заказ</span></a></div>' +
        '<div class="popupCartLink"><a class="link linkThemeMinor cartBasket" href="/cart">В корзине товаров:  ' + cartDataCount[0] + '</a></div>' +
        '</div>' +
        '<div class="closeWrapper"><a href="#" class="link close">x</a></div>' +
        '</div>' +
        '<div class="popupCartBottom">' +
        '<div class="popupCartBottomTitle">Оформление заказа на Ecarex.ru</div>' +
        '<ul><li>Для оформления текущего заказа перейдите по желтой кнопке</li>' +
        '<li>Для продолжения покупок достаточно закрыть данное окно</li>' +
        '<li>Для редактирования заказа перейдите в корзину</li></ul>' +
        '</div>' +
        '   </div>' +
        '</div>' +
        '<div class="overlay"></div>'
    );

    function showPopup() {
        var maskHeight:number = $(document).height(); var maskWidth:number = $(window).width();
        $('.overlay')
            .css({'width':maskWidth+ 'px','height':maskHeight+ 'px'})
            .fadeIn(200);
        var winH:number = $(window).height(); var winW:number = $(window).width();
        var winPopup = $('#popupCart');
        winPopup
            .css({'top': winH/2-winPopup.height()/2 + 'px','left': winW/2-winPopup.width()/2 + 'px','position':'fixed'})
            .fadeIn(200);
    }

    if(!showPopup()){
        $(window).on('resize scroll', showPopup);
        $(document).one('click','#popupCart .close', function (e) {
            e.preventDefault();
            $('.overlay').hide();
            $('.overlay, #popupCartWrapper').remove();
        });
        $(document).one('click','.overlay', function () {
            $('.overlay').hide();
            $('.overlay, #popupCartWrapper').remove();
        });
    }

    $that.prop('disabled', false); // разблокируем кнопку после обновления LS
    return false;
}
