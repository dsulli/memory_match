
var game = new Game();
var player = new Player();
var items = new Items();
var cards = new Cards();


$(document).ready(function() {

    /* --- Init --- */

    game.init();

    /* --- Modals --- */

    $('#how2play-modal, #items-modal, #about-modal').click(function() {
        var header_height = $('header').height() + 'px';
        $('.overlay').fadeIn();
        $('.info').fadeIn('slow').animate(
            { top: header_height },
            { queue: false, duration: 'slow' }
        );
    });

    $('.modal-btn, .x').click(function() {
        $('.overlay').fadeOut();
        $('.info').fadeOut('fast').animate(
            { top: 0 },
            { queue: false, duration: 'fast' }
        );
    });

    /* --- Card Click --- */

    $(".card").click(function() {
        cards.card_clicked($(this));
    });

    /* --- Shop --- */

    $('.shop .shop-item').click(function() {
        item_clicked($(this));
    });

    $('.shop .shop-item').mouseenter(function() {
        if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $(this).find('.tooltip').fadeIn();
        }
    });

    $('.shop .shop-item').mouseleave(function() {
        if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $(this).find('.tooltip').fadeOut(0);
        }
    });

    /* --- Reset --- */

    $('.reset').click(function() {
        reset();
    });



});