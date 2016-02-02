var first_card = null;
var second_card = null;
var match_counter = 0;
var total_matches = 9; //change this when you add more cards
var canClick = true;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var newHP = 1000;
var baseHP = 1000;
var card_flip_timer = null;
var currentGold = 300;

/*
* To randomize cards:
* make an array with the cards in them
* randomly select a card and slice it out of the array and push it onto a new array
*
* */

var items = [
    //health pot heals for 100
    {
        name: 'Health Pot',
        cost: 200,
        effect: function () {
            update_hp(100);
        }
    }
];

var inventory = [];

//function for when first and second cards don't match, shows the backs of them again
function showBack(first, second) {
    canClick = false;
    card_flip_timer = setTimeout(function(){
        card_flip_timer = null;
        first.find('.back').show();
        second.find('.back').show();
        canClick = true;
    }, 1000);
}

//run after first and second cards are flipped, resets values
function reset_cards() {
    first_card = null;
    second_card = null;
}

//display stats
function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + "%");
}

//resets stats when "reset game" button is clicked
function reset_stats() {
    attempts = 0;
    accuracy = 0;
    match_counter = 0;
    display_stats();
}

//only set accuracy when called so it doesn't divide 0 by 0
function set_accuracy() {
    accuracy = Math.round((match_counter / attempts) * 100);
}

function card_clicked(current) {
    //check if can click
    //check if the card is already flipped
    //then do nothing if either are true
    console.log(canClick);
    if(canClick === false || current.find('.back').css('display') == 'none') {
        return;
    }

    //flips the card over, showing the front
    current.find('.back').hide();

    //if first card hasn't been flipped, set this one to first card
    if(first_card == null) {
        first_card = current;
        return;
    }
    //if first card has been set, set this one to second card
    else {
        second_card = current;
        attempts++;

        //compares the two image source values
        //if they are the same
        if(first_card.find('.front img').attr('src') == second_card.find('.front img').attr('src')) {
            update_gold(300);
            match_counter++;
            //now that you've made a match, you can't divide by 0 anymore so we can now calculate accuracy
            set_accuracy();

            //now start over
            reset_cards();

            //check if all cards are matched then display a "you win" message
            if(match_counter === total_matches) {
                $('#victory').fadeIn();
            }
        }
        else { //cards don't match

            showBack(first_card, second_card);
            reset_cards();
            if(match_counter > 0) {
                set_accuracy();
            }
            update_hp(-100);
        }

        //refresh stats after every attempt
        display_stats();
    }
}

function randomize_cards() {
    var images = [
        'images/card_annie.png',
        'images/card_cait.png',
        'images/card_ez.png',
        'images/card_gnar.png',
        'images/card_jinx.png',
        'images/card_lulu.png',
        'images/card_lux.png',
        'images/card_mf.png',
        'images/card_vi.png',

        'images/card_annie.png',
        'images/card_cait.png',
        'images/card_ez.png',
        'images/card_gnar.png',
        'images/card_jinx.png',
        'images/card_lulu.png',
        'images/card_lux.png',
        'images/card_mf.png',
        'images/card_vi.png'
    ];
    var slots = images.length;
    var imagesCopy = [];
    for (var i = 0; i < slots; i++) {
        var randomNum = Math.floor((Math.random() * images.length));
        imagesCopy.push(images.splice(randomNum, 1));

    }

    for (var j = 0; j < imagesCopy.length; j++) {
        $('#game-area .card:nth-child(' + (j + 1) + ')').append('<div class="front"><img src="' + imagesCopy[j] + '"></div>');
    }
    return imagesCopy;

}

function remove_cards() {
    $('.front').remove();
}
function game_over() {
    clearTimeout(card_flip_timer);
    $('#defeat').fadeIn();
    $('.back').hide();
}

function update_hp(val) {
    if(newHP + val <= 0) {
        $('#hp-count').html(0 + ' / ' + baseHP);
        $('#hp-bar').css('width', 0);
        game_over();
        return;
    }
    else if (newHP + val > baseHP) {
        $('#hp-count').html(baseHP + ' / ' + baseHP);
        return;
    }
    else {
        newHP += val;
        $('#hp-count').html(newHP + ' / ' + baseHP);
    }
    $('#hp-bar').css('width', newHP/baseHP * 100 + '%');

}

function update_gold(val) {
    if(currentGold + val < 0) {
        return;
    }

    currentGold += val;
    $('#total-gold').html(currentGold);
    $('.gold').addClass('gold-active');
    setTimeout(function(){
        $('.gold').removeClass('gold-active');
    }, 500);

}

function reset() {
    games_played++;
    remove_cards()
    randomize_cards();
    reset_stats();
    display_stats();
    $('.back').show();
    $('#victory').fadeOut();
    $('#defeat').fadeOut();
    canClick = true;
    newHP = 1000;
    baseHP = 1000;
    $('#hp-count').html(newHP + ' / ' + baseHP);
    $('#hp-bar').css('width', newHP/baseHP * 100 + '%');
    currentGold = 300;
    update_gold(0);
}

function item_clicked(item) {
    for(var i = 0; i < items.length; i++) {
        if(item.find('img').attr('alt') == items[i].name) {
            if(currentGold >= items[i].cost) {
                update_gold(-(items[i].cost));
                items[i].effect();
            }
        }
    }

}

$(document).ready(function() {
    update_gold(0);
    update_hp(0);
    randomize_cards();
    display_stats();

    $('.card').click(function() {
        card_clicked($(this));
    });

    $('.shop-item').click(function() {
        item_clicked($(this));
    });

    $('.reset').click(function() {
       reset();
    });

});