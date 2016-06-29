function productCardGetJSON(id: any){
    $.getJSON(
        "/products/111.json",
        {ui: id}
        )
        .done(function(json: ProductCardMain){


            /* хлебные крошки и заголовок */
            var breadcrumbsCategory2 = $('#breadcrumbsCategory2');
            var breadcrumbsCategory1 = $('#breadcrumbsCategory1');
            breadcrumbsCategory1.find('span').text(json.d);
            breadcrumbsCategory2.find('span').text(json.mfd);
            $('.productCardTitle>h1').text(json.mfd + ' ' + json.pi);

            /* короткая спецификация */
            var productCardSpecListCount = json.productSpecShortList.length;
            var productCardSpec = $('.productCardSpec');
            if (json.productSpecShortList == null) {
                productCardSpec.empty();
            }
            else{
                productCardSpec.find('li').remove();
                for (var j = 0; j < productCardSpecListCount; j++) {
                    productCardSpec.find('ul').append('<li class="productCardSpecItem">' + json.productSpecShortList[j] + '</li>');
                }
                $('.productCardSpecMore').insertAfter(productCardSpec.find('ul'));
            }

            /* фото и галерея */
            var productCardImage = $('.productCardImage');
            var productCardThumbs = $('.productCardThumbs');
            if (json.imageList == null) {
                productCardImage.find('img').attr('src','/images/no_image.png');
                productCardThumbs.empty();
            }
            else if (json.imageList.length == 1) {
                productCardImage.find('img').attr('src','/images/'+json.imageList[0]+'.png');
                productCardThumbs.empty();
            }
            else {
                productCardImage.find('img').attr('src','/images/'+json.imageList[0]+'.png');
                productCardThumbs.find('li').remove();
                for (var j = 0; j < json.imageList.length; j++) {
                    productCardThumbs.find('ul').append('<li class="productCardThumbsItem"><a class="link" href="" onclick=""><img class="image" src="images/' + json.imageList[j] + '.png" alt=""></a></li>');
                }
                $('.productCardThumbs ul li:first').addClass('itemSelected');
            }

            /* футер карточки товара - залипающее меню */
            var productCardFooter = $('.productCardFooter');
            productCardFooter.find('li:nth-child(3) span').text(json.shopsList.length);
            productCardFooter.find('li:nth-child(4) span').text(json.shopsList.length);
            productCardFooter.find('li:nth-child(5) span').text('0');

            /* магазины - цены */
            /* листинг магазинов + расчет средней, мин и макс цен */
            var prices: number[] = [];
            var sumPrice: number = 0;
            var shopLink = $('.shopLink'); shopLink.find('.shopLinkRow').remove();
            var shopMap = $('.shopMap'); shopMap.find('li').remove();
            for (var j = 0; j < json.shopsList.length; j++) {
                prices[j] = json.shopsList[j].shopPrice;
                sumPrice += json.shopsList[j].shopPrice;
                if (json.shopsList[j].shopType == 101){
                    var delivery = '<div class="delivery" onclick="">' +
                        '<div class="deliveryInfo"><span class="deliveryIcon deliveryIconTruck"></span>' + json.shopsList[j].shopDeliveryInfo + ', ' + json.shopsList[j].shopDeliveryAvail + '</div>' +
                        '<div class="deliveryInfo"><span class="deliveryIcon deliveryIconSelf"></span>Самовывоз</div>' +
                        '</div>';
                }
                else if (json.shopsList[j].shopType == 102){
                    var delivery = '<div class="delivery" onclick="">' +
                        '<div class="deliveryInfo">' + json.shopsList[j].shopDeliveryAvail + '</div>' +
                        '<div class="deliveryInfo"></span>' + json.shopsList[j].shopDeliveryInfo + '</div>' +
                        '</div>';
                }
                else {
                    var delivery = '<div class="delivery" onclick="">' +
                        '<div class="deliveryInfo"><span class="deliveryIcon deliveryIconTruck"></span>' + json.shopsList[j].shopDeliveryInfo + ', ' + json.shopsList[j].shopDeliveryAvail + '</div>' +
                        '<div class="deliveryInfo"><span class="deliveryIcon deliveryIconSelf"></span>Срок поставки от 1 дня</div>' +
                        '</div>';
                }

                shopLink.append('<div class="shopLinkRow">' +
                    '<div class="container">' +
                    '<div class="row shopLinkRowContainer">' +
                    '<div class="col-xs-3 shopLinkcolumn">' +
                    '<a class="link linkShop" target="_blank" href="">' + json.shopsList[j].shopName + '</a>' +
                    '</div>' +
                    '<div class="col-xs-3 shopLinkcolumn">' +
                    '<div class="ratingStarsBlock">' +
                    '<div class="ratingStars" data-rate="' + json.shopsList[j].shopRatingStars + '" onclick=""> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i></div>' +
                    '  <a class="link " href="">' + json.shopsList[j].shopRatingCount + ' отзывов</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xs-3 shopLinkcolumn">' + delivery
                    +
                    '<a href="" target="_blank" class="link linkThemeMinor itemDelivery">Подробнее</a>' +
                    '</div>' +
                    '<div class="col-xs-2 shopLinkcolumn">' +
                    '<a href="" class="link itemPrice" target="_self">' + json.shopsList[j].shopPrice + 'руб.</a>' +
                    '</div>' +
                    '<div class="col-xs-1 shopLinkcolumn">' +
                    '<a role="button" type="button" class="button buttonSizeS buttonThemeAction toCart" data-uuid="124" data-shopid="123"  data-shop="ИП ТЕРЕХОВ Ириновский" data-price="7990" data-name="Cobra GPS4200CT" data-shopra="5" data-img="CobraGPS4200CT" href=""><span class="buttonText"><span class="text">В корзину</span></span></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                shopMap.find('ol').append(
                    '<li>' +
                        '<div class="itemShop">' +
                            '<a class="link linkShop" target="_blank" href="">' + json.shopsList[j].shopName + '</a>' +
                        '</div>' +
                        '<div class="ratingStarsBlock itemStars">' +
                            '<div class="ratingStars" data-rate="' + json.shopsList[j].shopRatingStars + '" onclick="">' +
                                '<i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> <i class="ratingStar" data-rate-name=""></i> ' +
                            '</div>' +
                            '<a class="link " href="">' + json.shopsList[j].shopRatingCount + ' отзывов</a>' +
                        '</div>' +
                        '<div class="itemAdress">' + json.shopsList[j].shopAdress + '</div>' +
                        '<div class="itemPriceSmall">' + json.shopsList[j].shopPrice + 'руб.</div>' +
                    '</li>');
            }
            $('.shopLinkFooter').insertAfter(shopLink.find('.shopLinkRow:last'));





            var maxPrice = Math.max.apply(null, prices);
            var minPrice = Math.min.apply(null, prices);
            var avgPrice = sumPrice/ json.shopsList.length;

            var productCardContent = $('.productCardContent');

            $('.productCardPriceValue').text(avgPrice + ' руб.');
            if (minPrice !== maxPrice) {
                $('.productCardPriceAverage').text(minPrice + ' - ' + maxPrice + ' руб.')
            }
            else {
                $('.productCardPriceAverage').text(avgPrice + ' руб.')
            }

            /* предложение в карточке товара и спецификациях */
            var productCardShop = $('.productCardShop');
            productCardShop.find('.productCardShopTitle a').text(json.shopsList[0].shopName);
            productCardShop.find('.ratingStars').attr('data-rate',json.shopsList[0].shopRatingStars);
            productCardShop.find('.ratingStarsBlock a').text(json.shopsList[0].shopRatingCount + ' отзывов');
            productCardShop.find('.phone span').text(json.shopsList[0].shopPhone);
            if (json.shopsList[0].shopType == 101){
                productCardShop.find('.deliveryInfo:first').html('<span class="deliveryIcon deliveryIconTruck"></span>' + json.shopsList[0].shopDeliveryInfo + ', ' + json.shopsList[0].shopDeliveryAvail);
                productCardShop.find('.deliveryInfo:nth-child(2)').text('Самовывоз');
            }
            else if (json.shopsList[0].shopType == 102){
                productCardShop.find('.deliveryInfo:first span').remove();
                productCardShop.find('.deliveryInfo:first').text(json.shopsList[0].shopDeliveryAvail);
                productCardShop.find('.deliveryInfo:second').text(json.shopsList[0].shopDeliveryInfo);
            }
            else if (json.shopsList[0].shopType == 103){
                productCardShop.find('.deliveryInfo:first').html('<span class="deliveryIcon deliveryIconTruck"></span>' + json.shopsList[0].shopDeliveryInfo + ', ' + json.shopsList[0].shopDeliveryAvail);
                productCardShop.find('.deliveryInfo:nth-child(2)').text('Срок поставки от 1 дня');
            }
            var productMinicard = $('.productMinicard');
            productMinicard.find('.productCardShopTitle a').text(json.shopsList[0].shopName);
            productMinicard.find('.ratingStars').attr('data-rate',json.shopsList[0].shopRatingStars);
            productMinicard.find('.ratingStarsBlock a').text(json.shopsList[0].shopRatingCount + ' отзывов');
            productMinicard.find('.phone span').text(json.shopsList[0].shopPhone);
            if (json.shopsList[0].shopType == 101){
                productMinicard.find('.deliveryInfo:first').html('<span class="deliveryIcon deliveryIconTruck"></span>' + json.shopsList[0].shopDeliveryInfo + ', ' + json.shopsList[0].shopDeliveryAvail);
                productMinicard.find('.deliveryInfo:nth-child(2)').text('Самовывоз');
            }
            else if (json.shopsList[0].shopType == 102){
                productMinicard.find('.deliveryInfo:first span').remove();
                productMinicard.find('.deliveryInfo:first').text(json.shopsList[0].shopDeliveryAvail);
                productMinicard.find('.deliveryInfo:second').text(json.shopsList[0].shopDeliveryInfo);
            }
            else if (json.shopsList[0].shopType == 103){
                productMinicard.find('.deliveryInfo:first').html('<span class="deliveryIcon deliveryIconTruck"></span>' + json.shopsList[0].shopDeliveryInfo + ', ' + json.shopsList[0].shopDeliveryAvail);
                productMinicard.find('.deliveryInfo:nth-child(2)').text('Срок поставки от 1 дня');
            }
            $('.buttonPrice').text(json.shopsList[0].shopPrice);
            $('.buttonPriceCurrency').text(' руб.');

            /* альтернативы - аналоги */
            var productAlternativeWrapper = $('.productAlternativeWrapper');







            /* полные характеристики */
            var productSpecFullContent = $('.productSpecFullContent');
            productSpecFullContent.empty();
            for (var j = 0; j < json.productSpecs.length; j++) {
                productSpecFullContent.append('<h2>'+json.productSpecs[j].title+'</h2>');
                for (var k = 0; k < json.productSpecs[j].left.length; k++) {
                    productSpecFullContent.append('<dl><dt><span>'+json.productSpecs[j].left[k]+'</span></dt><dd><span>'+json.productSpecs[j].right[k]+'</span></dd></dl>');
                }
            }

            /* рейтинги товара */
            var productOpinionContent = $('.productOpinionContent');
            if (json.productRatings == null){
                $('.productCardTitle>.rating').css("visibility","hidden");
                $('.productOpinionHeader h1').text('Отзывов нет, вы можете стать первым');
                $('.productOpinionHeader a.reviewCount').remove();
                productOpinionContent.html('<p>Расскажите о своём опыте использования товара.</p><p>Обратите внимание на качество, удобство и соответствие заявленным характеристикам.</p>');
                productOpinionContent.css('margin-bottom','90px')
            }
            else {
                /* будут ли рейтинги? пока уберем все */
                $('.productCardTitle>.rating').css("visibility","hidden");
                $('.productOpinionHeader h1').text('Отзывов нет, вы можете стать первым');
                $('.productOpinionHeader a.reviewCount').remove();
                productOpinionContent.html('<p>Расскажите о своём опыте использования товара.</p><p>Обратите внимание на качество, удобство и соответствие заявленным характеристикам.</p>');
                productOpinionContent.css('margin-bottom','90px')
            }


            console.log(json);

        });

}

