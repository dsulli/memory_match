/**
 * Holds all card variables and functions
 * @constructor
 * @this {Cards}
 */

function Cards() {

    var first_card = null;
    var second_card = null;
    this.canClick = true;
    this.card_flip_timer = null;
    var image_srcs = [
        'images/cards/card_annie.png',
        'images/cards/card_cait.png',
        'images/cards/card_ez.png',
        'images/cards/card_gnar.png',
        'images/cards/card_jinx.png',
        'images/cards/card_lulu.png',
        'images/cards/card_lux.png',
        'images/cards/card_mf.png',
        'images/cards/card_vi.png'
    ];


    /**
     * Flips mismatched cards over to their backs.
     * @param {jQuery} first - first card
     * @param {jQuery} second - second card
     */
    var show_back = function(first, second) {
        cards.canClick = false;
        cards.card_flip_timer = setTimeout(function(){
            cards.card_flip_timer = null;
            first.removeClass('card-flip');
            second.removeClass('card-flip');
            cards.canClick = true;

        }, 1250);
    };

    /** Resets first card and second card values */
    this.reset_cards = function() {
        first_card = null;
        second_card = null;
    };

    /**
     * Animates gold notification on top of second card.
     * Updates gold, HP (if player has lifesteal), match counter, and accuracy.
     * Checks whether all matches were made to display victory screen.
     *
     * @param {jQuery} second_card - card to append gold notification to
     */
    var made_match = function(second_card){
        //gold animation
        var goldNotice = $('<div>').addClass('plus-gold').html('+300 <img src="images/coins.png" alt="gold icon">');
        $(goldNotice).animate({
            top: '-20px',
            opacity: '1'
        });
        $(second_card).append(goldNotice);
        setTimeout(function() {
            $(goldNotice).animate({
                opacity: '0',
                top: '10px'
            }, function(){
                $(goldNotice).remove();
               }
            );

        }, 1000);

        //update stats
        player.update_hp(player.lifeSteal);
        player.update_gold(300);
        player.match_counter++;
        //now that you've made a match, you can't divide by 0 anymore so we can now calculate accuracy
        player.set_accuracy();

        //check if all cards are matched then display a "you win" message
        if(player.match_counter === game.total_matches) {
            $('#victory').fadeIn();
        }

    };

    /**
     * Performs functions based on which card was clicked.
     * @param {jQuery} current - the card that the player clicked
     */
    this.card_clicked = function(current) {
        //check if can click
        //check if the card is already flipped
        //then do nothing if either are true
        if(this.canClick === false || current.hasClass('card-flip')) {
            return;
        }

        //flips the card over, showing the front
        current.addClass('card-flip');

        //if first card hasn't been flipped, set this one to first card
        if(first_card == null) {
            first_card = current;

            //crit chance check
            if(Math.random() <= player.critChance) {

                second_card = find_card(current);
                player.attempts++;
                second_card.addClass('card-flip');
                made_match(second_card);
                cards.reset_cards();
            }

        }
        //if first card has been set, set this one to second card
        else {
            second_card = current;
            player.attempts++;

            //compares the two image source values
            //if they are the same
            if(first_card.find('.front img').attr('src') == second_card.find('.front img').attr('src')) {

                made_match(second_card);
            }
            else { //cards don't match
                show_back(first_card, second_card);
                if(player.match_counter > 0) {
                    player.set_accuracy();
                }
                player.update_gold(player.passiveGold);
                player.update_hp(-100 + (100 * player.armor));
            }
            cards.reset_cards();


            //refresh stats after every attempt
        }
        game.display_stats();

    };

    /**
     * Finds the matching card of the first card clicked
     * @param {jQuery} card - the first card the player clicked
     * @returns {jQuery} - the matching card
     */
    var find_card = function(card) {

        var first = card.find('.front img').attr('src');
        console.log(card.index());
        for(var i = 0; i < game.total_cards; i++) {
            var current_card = $('.card').eq(i);
            if(current_card.find('.front img').attr('src') == first &&
                current_card.index() !== card.index()) {
                console.log('found');
                return current_card;
            }
        }
    };

    /** Randomizes card order and places them inside the game area */
    this.randomize_cards = function() {
        var card_images = image_srcs.concat(image_srcs);

        //put image srcs into a copy array in random order
        var slots = card_images.length;
        var imagesCopy = [];
        for (var i = 0; i < slots; i++) {
            var randomNum = Math.floor((Math.random() * card_images.length));
            imagesCopy.push(card_images.splice(randomNum, 1));

        }

        //append whole card elements to game area
        for(var j = 0; j < game.total_cards; j++) {
            console.log('card ' + j);
            var card = $('<div>').addClass('card');
            var back = $('<div>').addClass('back').html('<img src="images/cards/card-back-helmet.png">');
            var front = $('<div>').addClass('front').html('<img src="' + imagesCopy[j] + '"></div>');
            card.append(back);
            card.append(front);
            $('#game-area').append(card);
        }

        //append front faces only to cards
        //var j = 0;
        //
        //$('.card').each(function(){
        //   $(this).append('<div class="front"><img src="' + imagesCopy[j++] + '"></div>');
        //});

    };

    /** Removes all cards from the game area */
    this.remove_cards = function() {
        $('.card').remove();
    };



}