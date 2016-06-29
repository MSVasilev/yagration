function productCardFooterMenu() {
    var productCardFooter = $(".productCardFooter");
    var productCardFooterMenu1 = $(".productCardFooter li:first");
    var productCardFooterMenu2 = $(".productCardFooter li:nth-child(2)");
    var productCardFooterMenu3 = $(".productCardFooter li:nth-child(3)");
    var productCardFooterMenu4 = $(".productCardFooter li:nth-child(4)");
    var productCardFooterMenu5 = $(".productCardFooter li:nth-child(5)");
    var productCardFooterMenu6 = $(".productCardFooter li:nth-child(6)");
    var shopLink = $(".shopLink");
    var buttonMore = $(".buttonMore");

    $(document).on('click.productCardFooterMenuNamepace','.productCardFooter li:first', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu1.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        productCardFooter.find('li').removeAttr('style');
        $(".productCardContent, .shopMap, .productAlternative, .productOpinion, .buttonMore").removeAttr('style');
        shopLink.detach().insertAfter('.productCardFooter');
        return false;
    });

    $(document).on('click.productCardFooterMenuNamepace','.productCardFooter li:nth-child(2)', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu2.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        $(".productCardFooter .container").css('box-shadow','0px 1px 0px 0px #EFEEED');
        productCardFooter.find('li').removeAttr('style');
        productCardFooterMenu2.css('border-bottom','1px solid #8F8F8E');
        $(".productCardContent, .shopMap, .productAlternative, .productOpinion").css('display','none');
        shopLink.detach().insertAfter('.productSpec');
        buttonMore.css('visibility','hidden');
            productCardMenuStick();
        return false;
    });

    $(document).on('click.productCardFooterMenuNamepace','.productCardFooter li:nth-child(3)', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu3.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        $(".productCardFooter .container").css('box-shadow','0px 1px 0px 0px #EFEEED');
        productCardFooter.find('li').removeAttr('style');
        productCardFooterMenu3.css('border-bottom','1px solid #8F8F8E');
        return false;
    });

    $(document).on('click.productCardFooterMenuNamepace','.productCardFooter li:nth-child(4)', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu4.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        $(".productCardFooter .container").css('box-shadow','0px 1px 0px 0px #EFEEED');
        productCardFooter.find('li').removeAttr('style');
        productCardFooterMenu4.css('border-bottom','1px solid #8F8F8E');
        return false;
    });

    $(document).on('click.productCardFooterMenuNamepace','.productCardFooter li:nth-child(5)', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu5.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        $(".productCardFooter .container").css('box-shadow','0px 1px 0px 0px #EFEEED');
        productCardFooter.find('li').removeAttr('style');
        productCardFooterMenu5.css('border-bottom','1px solid #8F8F8E');
        return false;
    });

    $(document).on('click.productCardFooterMenuNamepace','.productCardFooter li:nth-child(6)', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu6.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        $(".productCardFooter .container").css('box-shadow','0px 1px 0px 0px #EFEEED');
        productCardFooter.find('li').removeAttr('style');
        productCardFooterMenu6.css('border-bottom','1px solid #8F8F8E');
        return false;
    });

    $(document).on('click.productCardFooterMenuNamepace','.productCardSpecMore a', function(){
        productCardFooter.find('a').removeClass("linkThemeNone").addClass("linkThemeMinor");
        productCardFooterMenu2.find('a').removeClass("linkThemeMinor").addClass("linkThemeNone");
        $(".productCardFooter .container").css('box-shadow','0px 1px 0px 0px #EFEEED');
        productCardFooter.find('li').removeAttr('style');
        productCardFooterMenu2.css('border-bottom','1px solid #8F8F8E');
        $(".productCardContent, .shopMap, .productAlternative, .productOpinion").css('display','none');
        shopLink.insertAfter('.productSpec');
        buttonMore.css('visibility','hidden');
            productCardMenuStick();
        return false;
    });
}
