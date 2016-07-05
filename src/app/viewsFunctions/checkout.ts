
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
                '<div class="checkoutMainData">' +
                    '<div class="checkoutRadioDeliveryWrapper">' +
                        '<div class="checkoutRadioItemDelivery">' +
                            '<input type="radio" id="checkoutRadioDeliverySelf" name="checkoutRadioDelivery" checked="checked"/>' +
                            '<label for="checkoutRadioDeliverySelf">Самовывоз</label>' +
                            '<span class="checkoutDeliveryPrice">Бесплатно</span>' +
                            '<span class="checkoutDeliveryDate">Сегодня</span>' +
                        '</div>' +
                        '<div class="checkoutRadioItemDelivery">' +
                            '<input type="radio" id="checkoutRadioDeliveryCourier" name="checkoutRadioDelivery"/>' +
                            '<label for="checkoutRadioDeliveryCourier">Доставка курьером по СПб</label>' +
                            '<span class="checkoutDeliveryPrice">Бесплатно</span>' +
                            '<span class="checkoutDeliveryDate">Сегодня*</span>' +
                        '</div>' +
                        '<div class="checkoutRadioItemDelivery">' +
                            '<input type="radio" id="checkoutRadioDeliveryRussia" name="checkoutRadioDelivery"/>' +
                            '<label for="checkoutRadioDeliveryRussia">Доставка по РФ</label>' +
                            '<span class="checkoutDeliveryPrice">По тарифу ТК</span>' +
                            '<span class="checkoutDeliveryDate">От 2-х дней</span>' +
                        '</div>' +
                        '<div class="checkoutRadioItemDelivery">' +
                            '<input type="radio" id="checkoutRadioDeliveryCTO" name="checkoutRadioDelivery" />' +
                            '<label for="checkoutRadioDeliveryCTO">Установка на СТО</label>' +
                            '<span class="checkoutDeliveryPrice"></span>' +
                            '<span class="checkoutDeliveryDate"></span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="checkoutDeliveryWrapper">' +
                        '<div id="checkoutDeliverySelf">' +
                            '<span class="checkoutRadioShopTitle">Адрес магазина</span>' +
                            '<div class="checkoutRadioItemShop">' +
                                '<input type="radio" id="checkoutRadioShopIrinovski" name="checkoutRadioShop" checked="checked"/>' +
                                '<label for="checkoutRadioShopIrinovski"><span class="checkoutRadioShopName">ИП Теребов на Ириновском</span>г. Санкт-Петербург, Ириновский пр., д. 1А<span class="checkoutRadioShopHours">с 10:00 до 20:00</span></label>' +
                            '</div>' +
                            '<div class="checkoutRadioItemShop">' +
                                '<input type="radio" id="checkoutRadioShopBogaturski" name="checkoutRadioShop"/>' +
                                '<label for="checkoutRadioShopBogaturski"><span class="checkoutRadioShopName">ИП Теребов на Богатырском</span>г. Санкт-Петербург, Богатырский пр., д. 30<span class="checkoutRadioShopHours">с 10:00 до 20:00</span></label>' +
                            '</div>' +
                            '<span class="checkoutRadioContactsTitle">Данные покупателя (для сообщений о статусе заказа)</span>' +
                            '<div class="checkoutRadioContacts">' +                
                                '<input type="text" class="checkoutRadioContactsForm" name="checkoutRadioContacts" placeholder="+7 123 123-45-67" required="required"/>' +
                                '<input type="text" class="checkoutRadioContactsForm" name="checkoutRadioContacts" placeholder="Электронная почта" required="required"/>' +
                                '<input type="text" class="checkoutRadioContactsForm" name="checkoutRadioContacts" placeholder="Имя и фамилия" required="required"/>' +
                            '</div>' +            
                        '</div>' +
                        '<div id="checkoutDeliveryCourier">' +
                            '<span class="checkoutRadioShopTitle">Адрес доставки</span>' +
                            '<div class="checkoutAddressForm">' +
                                '<input type="text" class="checkoutAddressFormInput" name="checkoutAddress" value="Санкт-Петербург, " required="required"/>' +
                                '<input type="text" class="checkoutAddressFormInput" name="checkoutAddress" placeholder="Кв. или офис" required="required"/>' +
                                '<a class="link linkThemeMiner" href="">Добавить комментарий к заказу</a>' +
                                '<textarea id="checkoutAddressFormCommentary" class="checkoutAddressFormInput" name="checkoutAddress"></textarea>' +
                            '</div>' +
                            '<span class="checkoutRadioContactsTitle">Данные покупателя (для сообщений о статусе заказа)</span>' +
                            '<div class="checkoutRadioContacts">' +
                                '<input type="text" class="checkoutRadioContactsForm" name="checkoutRadioContacts" placeholder="+7 123 123-45-67" required="required"/>' +
                                '<input type="text" class="checkoutRadioContactsForm" name="checkoutRadioContacts" placeholder="Электронная почта" required="required"/>' +
                                '<input type="text" class="checkoutRadioContactsForm" name="checkoutRadioContacts" placeholder="Имя и фамилия" required="required"/>' +
                            '</div>' +
                        '</div>' +
                        '<div id="checkoutDeliveryRussia">' +
                            '<div>Почтовая доставка по России</div>' +
                            '<span>ИП Теребов осуществляет доставку товара компанией СПСР в большинство населённых пунктов России.</span>' +
                            '<span>Срок доставки от 2 дней, в зависимости от региона получателя.</span>' +
                            '<span>Доставка до терминала транспортной компании осуществляется бесплатно, далее - по тарифам ТК.</span>' +
                            '<span>Обязательна предварительная оплата товара.</span>' +
                        '</div>' +
                        '<div id="checkoutDeliveryCTO">сто' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="checkoutMainPayment">' +
                    '<p>оплата</p>' +
                    '<div class="checkoutRadioPaymentWrapper">' +
                        '<div class="checkoutRadioPaymentItem">' +
                            '<input type="radio" id="checkoutRadioPaymentCash" name="checkoutRadioPayment"/>' +
                            '<label for="checkoutRadioPaymentCash">Наличными при получении</label>' +
                        '</div>' +
                        '<div class="checkoutRadioPaymentItem">' +
                            '<input type="radio" id="checkoutRadioPaymentCard" name="checkoutRadioPayment"/>' +
                            '<label for="checkoutRadioPaymentCard">Банковской картой при получении</label>' +
                        '</div>' +
                        '<div class="checkoutRadioPaymentItem">' +
                            '<input type="radio" id="checkoutRadioPaymentOnlineCard" name="checkoutRadioPayment" checked="checked"/>' +
                            '<label for="checkoutRadioPaymentOnlineCard">Банковской картой (онлайн)</label>' +
                        '</div>' +
                        '<div class="checkoutRadioPaymentItem">' +
                            '<input type="radio" id="checkoutRadioPaymentOnlineYa" name="checkoutRadioPayment"/>' +
                            '<label for="checkoutRadioPaymentOnlineYa">Яндекс.Деньги</label>' +
                        '</div>' +
                        '<div class="checkoutRadioPaymentItem">' +
                            '<input type="radio" id="checkoutRadioPaymentOnlineWebmoney" name="checkoutRadioPayment"/>' +
                            '<label for="checkoutRadioPaymentOnlineWebmoney">WebMoney (комиссия +2.5%)</label>' +
                        '</div>' +
                        '<div class="checkoutRadioPaymentItem">' +
                            '<input type="radio" id="checkoutRadioPaymentCompany" name="checkoutRadioPayment"/>' +
                            '<label for="checkoutRadioPaymentCompany">Оплата от юридического лица </label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="checkoutRadioPaymentPriceWrapper">' +
                        '<h2>' +  itemCartCount[1] + ' руб.</h2>' +                                                               // для чекаута и оплаты потом переделать (брать данные с сервера)
                    '</div>' +
                    '<div class="checkoutOrder">' +
            '<div>' +
                        '<a role="button" type="button" class="button buttonSizeM buttonThemeAction" href="">' +
                            '<span class="buttonText">Отправить заказ</span>' +
                        '</a>' +
            '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="checkoutBottomPolicy">' +
                '<input id="policyCheckbox" type="checkbox" checked="checked"/><label for="policyCheckbox">Я принимаю</label><span id="policyLink"><a class="link linkThemeMinor" target="_blank" href="">условия использования сервиса</a></span> '+
            '</div>'




        );



        $('.checkoutRadioItemDelivery').on('click', function() {
            $(this).find('input').prop( "checked", true );
            $('.checkoutRadioItemDelivery').css({'background-color':'#fff', 'box-shadow':'1px 0 0 0 #e2e2e2, 0 1px 0 0 #e2e2e2, 1px 0 0 0 #e2e2e2 inset, 0 1px 0 0 #e2e2e2 inset','z-index':'1'});
            $('.checkoutRadioItemDelivery input:checked').parent().css({'background-color':'#fdedad', 'box-shadow':'1px 0 0 0 #dec356, 0 1px 0 0 #dec356, 1px 0 0 0 #dec356 inset, 0 1px 0 0 #dec356 inset','z-index':'2'});
            if ($('#checkoutRadioDeliverySelf').prop("checked")){
                $('#checkoutDeliverySelf').css({'display':'block'});
                $('#checkoutDeliveryCourier').css({'display':'none'});
                $('#checkoutDeliveryRussia').css({'display':'none'});
                $('#checkoutDeliveryCTO').css({'display':'none'});
                $('.checkoutRadioPaymentItem:nth-child(1)').css({'display':'block'});
                $('.checkoutRadioPaymentItem:nth-child(2)').css({'display':'block'});
            }
            else if ($('#checkoutRadioDeliveryCourier').prop("checked")){
                $('#checkoutDeliverySelf').css({'display':'none'});
                $('#checkoutDeliveryCourier').css({'display':'block'});
                $('#checkoutDeliveryRussia').css({'display':'none'});
                $('#checkoutDeliveryCTO').css({'display':'none'});
                $('.checkoutRadioPaymentItem:nth-child(1)').css({'display':'block'});
                $('.checkoutRadioPaymentItem:nth-child(2)').css({'display':'block'});
            }
            else if ($('#checkoutRadioDeliveryRussia').prop("checked")){
                $('#checkoutDeliverySelf').css({'display':'none'});
                $('#checkoutDeliveryCourier').css({'display':'none'});
                $('#checkoutDeliveryRussia').css({'display':'block'});
                $('#checkoutDeliveryCTO').css({'display':'none'});
                $('.checkoutRadioPaymentItem:nth-child(1)').css({'display':'none'});
                $('.checkoutRadioPaymentItem:nth-child(2)').css({'display':'none'});
            }
            else if ($('#checkoutRadioDeliveryCTO').prop("checked")){
                $('#checkoutDeliverySelf').css({'display':'none'});
                $('#checkoutDeliveryCourier').css({'display':'none'});
                $('#checkoutDeliveryRussia').css({'display':'none'});
                $('#checkoutDeliveryCTO').css({'display':'block'});
                $('.checkoutRadioPaymentItem:nth-child(1)').css({'display':'block'});
                $('.checkoutRadioPaymentItem:nth-child(2)').css({'display':'block'});
            }

        }).triggerHandler('click');

        $('.checkoutAddressForm > a').on('click', function() {
            $('#checkoutAddressFormCommentary').toggle();
        });




    }
    return false;
}
