
function regForm(){
    $('#pjax').append(
        '<div id="popupRegFormWrapper" xmlns="http://www.w3.org/1999/html">' +
            '<div id="popupRegForm" class="popupRegFormWindow">' +

                '<div class="popupRegFormTop">черновой вариант/разметка' +
                    '<ul>' +
                        '<li>Вход | Регистрация</li>' +
                        '<li>Полная регистрация</li>' +
                    '</ul>' +
                    '<div class="popupRegFormCloseWrapper"><a href="#" class="link close">x</a></div>' +
                '</div>' +

                '<div class="popupRegFormMiddle">' +
                    '<form>'+
                        '<label><input class="popupRegFormInputName" type="text" class="" placeholder="Имя" name="regForm"/></label>' +
                        '<select class="popupRegFormInputGender" name="regForm">' +
                            '<option disabled selected hidden>Укажите пол</option>' +
                            '<option>Мужской</option>' +
                            '<option>Женский</option>' +
                        '</select>' +
                        '<label><input class="popupRegFormInputBirthdate" type="date" class="" placeholder="Дата рождения" name="regForm"/></label>' +
                        '<label><input class="popupRegFormInputEmail" type="email" class="" placeholder="E-mail" name="regForm"/></label>' +
                        '<label><input class="popupRegFormInputPhone" type="tel" class="" placeholder="Телефон" name="regForm"/></label>' +
                        '<label><input class="popupRegFormInputPass" type="password" class="" placeholder="Пароль" name="regForm"/></label>' +
                    '</form>'+
                    '<a class="link linkThemeMinor" href="">Получить пароль по смс</a>' +
                    '<div class="popupRegFormMiddleInfo">Если вы регистрируетесь впервые или забыли пароль, то получите пароль по sms</div>' +
                    '<div class="smsInfoLine">' +
                        '<label><input id="smsInfoLine" type="checkbox" class="" />Получать уведомления</label> ' +
                    '</div>' +
                '</div>' +

                '<div class="popupRegFormBottom">' +
                    '<div class="popupRegFormBottomButton">' +
                        '<a role="button" type="button" class="button buttonSizeM buttonThemeAction" href="">' +
                            '<span class="buttonText">Войти</span>' +
                        '</a>' +
                    '</div>' +
                '</div>' +

            '</div>' +
        '</div>' +
        '<div class="overlay"></div>'
    );

    function showPopupRegForm() {
        var maskHeight:number = $(document).height(); var maskWidth:number = $(window).width();
        $('.overlay')
            .css({'width':maskWidth+ 'px','height':maskHeight+ 'px'})
            .fadeIn(200);
        var winH:number = $(window).height(); var winW:number = $(window).width();
        var winPopup = $('#popupRegForm');
        winPopup
            .css({'top': winH/2-winPopup.height()/2 + 'px','left': winW/2-winPopup.width()/2 + 'px','position':'fixed'})
            .fadeIn(200);
    }

    if(!showPopupRegForm()){
        $(window).on('resize scroll', showPopupRegForm);
        $(document).one('click','#popupRegForm .close', function (e) {
            e.preventDefault();
            $('.overlay').hide();
            $('.overlay, #popupRegFormWrapper').remove();
        });
        $(document).one('click','.overlay', function () {
            $('.overlay').hide();
            $('.overlay, #popupRegFormWrapper').remove();
        });
    }

    return false;
}

