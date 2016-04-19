/*
To do at some point:
- Make object oriented (cards and items)
- "You have slain an enemy" "Double Kill" etc
 */

var first_card = null;
var second_card = null;
var match_counter = 0;
var total_matches = 9; //change this when you add more cards
var canClick = true;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var newHP = 1000;
var card_flip_timer = null;
var currentGold = 300;

//player stats from items
var baseHP = 1000;
var critChance = 0;
var armor = 0;
var lifeSteal = 0;
var passiveGold = 0;

var inventoryCount = 0;
/*
* To randomize cards:
* make an array with the cards in them
* randomly select a card and slice it out of the array and push it onto a new array
*
* */

var items = [
    //health pot heals for 50
    {
        name: 'Health Potion',
        cost: 150,
        type: 'consume',
        src: 'images/items/item_hp.jpg',
        effect: function () {
            update_hp(50);
        }
    },

    //armor reduces damage from 100 to 50 from hit
    {
        name: 'Cloth Armor',
        cost: 400,
        type: 'passive',
        src: 'images/items/item_clotharmor.jpg',
        effect: function () {
            armor += .2;
        }
    },

    //health item raises base HP by 200
    {
        name: 'Kindlegem',
        cost: 800,
        type: 'passive',
        src: 'images/items/item_kindlegem.jpg',
        effect: function () {
            baseHP += 200;
            update_hp(200);
        }
    },

    //Ancient Coin gives gold on mismatch
    {
        name: 'Ancient Coin',
        cost: 300,
        type: 'passive',
        src: 'images/items/item_ancientcoin.jpg',
        effect: function () {
            passiveGold += 30;
        }
    },

    //Life steal revives hp upon killing
    {
        name: 'Vampiric Scepter',
        cost: 900,
        type: 'passive',
        src: 'images/items/item_vampiricscepter.jpg',
        effect: function () {
            lifeSteal += 30;
        }
    },

    //Crit chance raises the chances of automatically getting a match
    {
        name: 'Brawlers Gloves',
        cost: 500,
        type: 'passive',
        src: 'images/items/item_brawlersgloves.jpg',
        effect: function () {
            critChance += .1;
        }
    }
];

/* ------------- CARD FUNCTIONS ------------- */

//function for when first and second cards don't match, shows the backs of them again
function showBack(first, second) {
    canClick = false;
    card_flip_timer = setTimeout(function(){
        card_flip_timer = null;
        first.removeClass('card-flip');
        second.removeClass('card-flip');
        canClick = true;

    }, 1250);


}

//run after first and second cards are flipped, resets values
function reset_cards() {
    first_card = null;
    second_card = null;
}

function made_match(second_card){
    //second_card.find('.front').css('backface-visibility', 'visible');


    var goldNotice = $('<div>').addClass('plus-gold').html('+300 <img src="images/coins.png" alt="gold icon">');
    $(goldNotice).animate({
        top: '-20px',
        opacity: '1'
    });
    $(second_card).append(goldNotice);
    setTimeout(function() {
        $(goldNotice).animate({
            opacity: '0',
            top: '10px',

        }, function(){
            $(goldNotice).remove(); });

    }, 1000);


    update_hp(lifeSteal);
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

function card_clicked(current) {
    //check if can click
    //check if the card is already flipped
    //then do nothing if either are true
    if(canClick === false || $(current).hasClass('card-flip')) {
        return;
    }

    //flips the card over, showing the front
    current.addClass('card-flip');


    //if first card hasn't been flipped, set this one to first card
    if(first_card == null) {
        first_card = current;

        if(Math.random() <= critChance) {

            second_card = find_card(current);
            attempts++;
            second_card.addClass('card-flip');

            made_match();
            display_stats();
        }

        return;
    }
    //if first card has been set, set this one to second card
    else {
        second_card = current;
        attempts++;

        //compares the two image source values
        //if they are the same
        if(first_card.find('.front img').attr('src') == second_card.find('.front img').attr('src')) {

            made_match(second_card);
        }
        else { //cards don't match
            showBack(first_card, second_card);
            reset_cards();
            if(match_counter > 0) {
                set_accuracy();
            }
            update_gold(passiveGold);
            update_hp(-100 + (100 * armor));
        }

        //refresh stats after every attempt
        display_stats();
    }
}

function find_card(card) {

    var first = card.find('.front img').attr('src');
    console.log(card.index());
    for(var i = 0; i < 18; i++) {
        if($('.card').eq(i).find('.front img').attr('src') == first &&
            $('.card').eq(i).index() !== card.index()) {
            console.log('found');
            return $('.card:nth-child(' + (i+1) + ')');
        }
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


/* ------------- GAME STAT FUNCTIONS ------------- */

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


/* ------------- GAME PLAY FUNCTIONS ------------- */



function game_over() {
    //cancel cards flipping over to show back
    clearTimeout(card_flip_timer);
    $('#defeat').fadeIn();

    $('.card').addClass('card-flip');

    //$('.back').hide();
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


    if(val !== 0) {
        $('.gold').addClass('gold-active');
        setTimeout(function(){
            $('.gold').removeClass('gold-active');
        }, 500);
    }
    enable_item();

}
//transitionend: event for when the animation ends
//when .card animation ends, call reset_card_primer
//do this for all 18 .cards
//when it goes through all 18 cards, animation is done
//remove/randomize cards
//stop looking for event reset_card_primer
//reset_card_count back to 18 for next time
var reset_card_count = 0;
function reset_card_primer(){
    console.log(reset_card_count);
    if(--reset_card_count>0){
        return;
    }
    console.log('animation done, changing cards')
    remove_cards();
    randomize_cards();
    $('.card').off('transitionend',reset_card_primer);
}
//dan start
function reset() {
    //increments number of games played
    games_played++;
    reset_stats(); //set  game stats to 0
    display_stats(); //show that they have been set to 0
    //wait for all cards to be flipped back, then randomize cards
    reset_card_count = $('.card-flip').length;
    $('.card').on('transitionend', reset_card_primer);
    $('.card').removeClass('card-flip'); //flip all cards back;
    $('#victory').fadeOut();
    $('#defeat').fadeOut();
    canClick = true;
    newHP = 1000;
    baseHP = 1000;
    critChance = 0;
    armor = 0;
    lifeSteal = 0;
    passiveGold = 0;
    $('#hp-count').html(newHP + ' / ' + baseHP);
    $('#hp-bar').css('width', newHP/baseHP * 100 + '%');
    currentGold = 300;
    update_gold(0);
    clear_inventory();
}

/* ------------- ITEM FUNCTIONS ------------- */


function update_inventory(item) {
    /*
        loop through item slots
        check if empty
        if empty, put purchased item into slot
        if not empty, move on
        if there are no empty slots, do nothing, don't buy item
     */

    for(var i = 0; i < 3; i++) {
        if($('#inventory .item-slot:nth-child(' + (i + 1) + ')').html() == '') {
            $('#inventory .item-slot:nth-child(' + (i + 1) + ')').append('<img src="' + item.src + '" alt="' + item.name + '"></div>');
            return;
        }
    }
}

function clear_inventory() {
    $('#inventory .item-slot').empty();
    inventoryCount = 0;
}

function can_afford(itemcost) {
    return currentGold >= itemcost;

}

/* TODO: REWRITE THIS PLS
* IT'S HORRIBLE */
function enable_item() {
    var item;
    for(var i = 0; i < items.length; i++) {
        for(var j = 0; j < items.length; j++) {
            if($('.shop-item .item-slot').eq(i).find('img').attr('alt') === items[j].name) {
                item = items[j];
                if(!can_afford(item.cost)) {
                    $('.shop-item .item-slot').eq(i).addClass('disabled');
                }
                else {
                    $('.shop-item .item-slot').eq(i).removeClass('disabled');
                }
            }
        }

    }

}

function item_clicked(item) {
    var item_bought;

    console.log("item was clicked");

    //search for that item's info
    for(var i = 0; i < items.length; i++) {
        if(item.find('img').attr('alt') == items[i].name) {
            item_bought = items[i];
        }
    }

    console.log(item_bought.cost);
    if(item_bought.name != 'Health Potion' && inventoryCount > 3) {
        return;
    }
    //Check if item can be bought
    if(currentGold >= item_bought.cost) {

        //check if item is a consumable, then use immediately
        if(item_bought.type == "consume"){
            item_bought.effect();
        }

        //check if item is a passive item, then put into inventory
        if(item_bought.type == "passive") {
            update_inventory(item_bought);
            item_bought.effect();
        }

        //subtract item cost from current gold
        update_gold(-(item_bought.cost));
        if(item_bought.name != 'Health Potion') {
            inventoryCount++;
        }

    }

}

$(document).ready(function() {
    update_gold(0);
    update_hp(0);
    randomize_cards();
    display_stats();

    $('#how2play-modal').click(function() {
        $('.overlay').fadeIn();
        $('.info').fadeIn('slow').animate(
            { top: '15vh'},
            { queue: false, duration: 'slow' }
        );
    });

    $('.modal-btn').click(function() {
        $('.overlay').fadeOut();
        $('.info').fadeOut('fast').animate(
            { top: 0},
            { queue: false, duration: 'fast' }
        );
    });

    $('.card').click(function() {
        card_clicked($(this));
    });

    $('.shop-item').click(function() {
        item_clicked($(this));
    });

    $('.shop-item').mouseenter(function() {
       $(this).find('.tooltip').fadeIn();

    });

    $('.shop-item').mouseleave(function() {
        $(this).find('.tooltip').fadeOut(0);

    });

    $('.reset').click(function() {
       reset();
    });



});