
function cart() {
    $(document).on('click', '.toCart', addToCart);
    $(document).on('click', '.headerMenuItemFavorite', emptyCart); //временно: кнопка сброса корзины
}

function cartInit() {
    var cartCountPlace = $('#cartCountPlace');
    if (!localStorage.getItem('cartData')) {
        cartCountPlace.empty();
    } else {
        var cartDataCount = getCartDataCount();
        cartCountPlace.text(cartDataCount[0]);
    }
}
