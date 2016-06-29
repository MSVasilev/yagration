function productCardMenuStick() {
    var objToStick:JQuery = $(".productCardFooter");
    var topOfObjToStick:number = $(objToStick).offset().top;
    $(window).scroll(function () {
        var windowScroll = $(window).scrollTop();
        if (windowScroll > topOfObjToStick) {
            $(objToStick).addClass("fixed");
        }
        else {
            $(objToStick).removeClass("fixed");
        }
    });
}


