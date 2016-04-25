

function Cards() {

    var first_card = null;
    var second_card = null;
    this.canClick = true;
    this.card_flip_timer = null;
    var image_srcs = [
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


    //function for when first and second cards don't match, shows the backs of them again
    var show_back = function(first, second) {
        cards.canClick = false;
        cards.card_flip_timer = setTimeout(function(){
            cards.card_flip_timer = null;
            first.removeClass('card-flip');
            second.removeClass('card-flip');
            cards.canClick = true;

        }, 1250);


    };

    //run after first and second cards are flipped, resets values
    var reset_cards = function() {
        first_card = null;
        second_card = null;
    };

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


        player.update_hp(player.lifeSteal);
        player.update_gold(300);
        player.match_counter++;
        //now that you've made a match, you can't divide by 0 anymore so we can now calculate accuracy
        player.set_accuracy();

        //now start over
        reset_cards();

        //check if all cards are matched then display a "you win" message
        if(player.match_counter === game.total_matches) {
            $('#victory').fadeIn();
        }

    };

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

                made_match();
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
                reset_cards();
                if(player.match_counter > 0) {
                    player.set_accuracy();
                }
                player.update_gold(player.passiveGold);
                player.update_hp(-100 + (100 * player.armor));
            }

            //refresh stats after every attempt
        }
        game.display_stats();

    };

    //for crit chance only
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

    this.randomize_cards = function() {
        var card_images = image_srcs.concat(image_srcs);

        //put image srcs into a copy array in random order
        var slots = card_images.length;
        var imagesCopy = [];
        for (var i = 0; i < slots; i++) {
            var randomNum = Math.floor((Math.random() * card_images.length));
            imagesCopy.push(card_images.splice(randomNum, 1));

        }

        //append front faces to cards
        var j = 0;

        $('.card').each(function(){
           $(this).append('<div class="front"><img src="' + imagesCopy[j++] + '"></div>');
        });

    };

    this.remove_card_fronts = function() {
        $('.front').remove();
    };



}