
function Game() {
    this.total_cards = 18;
    this.total_matches = this.total_cards / 2;
    this.max_inventory_size = 3;


    this.init = function() {
        player.update_gold(0);
        player.update_hp(0);
        cards.randomize_cards();
        this.display_stats();
    };

    this.display_stats = function() {
        $('.games-played .value').text(player.games_played);
        $('.attempts .value').text(player.attempts);
        $('.accuracy .value').text(player.accuracy + "%");
    };

    this.reset_stats = function() {
        player.attempts = 0;
        player.accuracy = 0;
        player.match_counter = 0;
        this.display_stats();
    };

    this.game_over = function() {
        //cancel cards flipping over to show back
        clearTimeout(cards.card_flip_timer);
        $('#defeat').fadeIn();
        $('.card').addClass('card-flip');

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
        console.log('animation done, changing cards');
        cards.remove_cards();
        cards.randomize_cards();
        $('.card').off('transitionend', reset_card_primer);
    };

    this.reset = function() {
        //increments number of games played
        player.games_played++;
        this.reset_stats(); //set  game stats to 0
        //wait for all cards to be flipped back, then randomize cards
        reset_card_count = $('.card-flip').length;
        $('.card').on('transitionend', reset_card_primer);
        $('.card').removeClass('card-flip'); //flip all cards back;
        $('#victory').fadeOut();
        $('#defeat').fadeOut();
        cards.canClick = true;
        player.currentHP = 1000;
        player.baseHP = 1000;
        player.critChance = 0;
        player.armor = 0;
        player.lifeSteal = 0;
        player.passiveGold = 0;
        $('#hp-count').html(player.currentHP + ' / ' + player.baseHP);
        $('#hp-bar').css('width', player.currentHP/player.baseHP * 100 + '%');
        player.currentGold = 300;
        player.update_gold(0);
        player.clear_inventory();
    };
}