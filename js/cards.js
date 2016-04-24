

function Cards() {

    var first_card = null;
    var second_card = null;
    var canClick = true;
    var card_flip_timer = null;


    //function for when first and second cards don't match, shows the backs of them again
    var showBack = function(first, second) {
        canClick = false;
        card_flip_timer = setTimeout(function(){
            card_flip_timer = null;
            first.removeClass('card-flip');
            second.removeClass('card-flip');
            canClick = true;

        }, 1250);


    };

    //run after first and second cards are flipped, resets values
    var reset_cards = function() {
        first_card = null;
        second_card = null;
    };

    var made_match = function(second_card){
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

    };

    this.card_clicked = function(current) {
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
    };

    var find_card = function(card) {

        var first = card.find('.front img').attr('src');
        console.log(card.index());
        for(var i = 0; i < 18; i++) {
            if($('.card').eq(i).find('.front img').attr('src') == first &&
                $('.card').eq(i).index() !== card.index()) {
                console.log('found');
                return $('.card:nth-child(' + (i+1) + ')');
            }
        }
    };

    var randomize_cards = function() {
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

    };

    var remove_cards = function() {
        $('.front').remove();
    };



}