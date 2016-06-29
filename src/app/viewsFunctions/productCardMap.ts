
function productCardShowYandexMap() {
    var script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        script.async;
        script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=pMPae48WfX4AZLmqQPYyqKg8UkaPd7Eq&width=100%&height=300&lang=ru_RU&sourceType=constructor&scroll=true";
    document.getElementById('productMapWrapper').appendChild(script);
    return false;

}
