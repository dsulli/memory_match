
function Game() {
    this.total_matches = 9; //change this when you add more cards

    this.init = function() {
        update_gold(0);
        update_hp(0);
        randomize_cards();
        display_stats();
    };

    var display_stats = function() {
        $('.games-played .value').text(games_played);
        $('.attempts .value').text(attempts);
        $('.accuracy .value').text(accuracy + "%");
    };

    var reset_stats = function() {
        attempts = 0;
        accuracy = 0;
        match_counter = 0;
        display_stats();
    };

    //only set accuracy when called so it doesn't divide 0 by 0
    var set_accuracy = function() {
        accuracy = Math.round((match_counter / attempts) * 100);
    };

    var game_over = function() {
        //cancel cards flipping over to show back
        clearTimeout(card_flip_timer);
        $('#defeat').fadeIn();

        $('.card').addClass('card-flip');

        //$('.back').hide();
    };

    //transitionend: event for when the animation ends
    //when .card animation ends, call reset_card_primer
    //do this for all 18 .cards
    //when it goes through all 18 cards, animation is done
    //remove/randomize cards
    //stop looking for event reset_card_primer
    //reset_card_count back to 18 for next time
    var reset_card_count = 0;
    var reset_card_primer = function(){
        console.log(reset_card_count);
        if(--reset_card_count>0){
            return;
        }
        console.log('animation done, changing cards')
        remove_cards();
        randomize_cards();
        $('.card').off('transitionend',reset_card_primer);
    };

    var reset = function() {
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
    };
}