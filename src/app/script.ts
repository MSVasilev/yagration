/// <reference path="../../definitelyTyped/jquery.d.ts" />
/// <reference path="../../definitelyTyped/jquery.pjax.d.ts" />
//пока отключим переходы по всем ссылкам
$(document).on('click','a', function(e){e.preventDefault();}); 