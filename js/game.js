/**
 * Holds all game variables and functions
 * @constructor
 * @this {Game}
 */

function Game() {
    this.total_cards = 18;
    this.total_matches = this.total_cards / 2;
    this.max_inventory_size = 3;
    var reset_card_count = 0;

    /** Initializes the game. */
    this.init = function() {
        player.update_gold(0);
        player.update_hp(0);
        cards.randomize_cards();
        this.display_stats();
    };

    /** Displays game stats. */
    this.display_stats = function() {
        $('.games-played .value').text(player.games_played);
        $('.attempts .value').text(player.attempts);
        $('.accuracy .value').text(player.accuracy + "%");
    };

    /** Resets both game stats and player stats. */
    this.reset_stats = function() {
        player.attempts = 0;
        player.accuracy = 0;
        player.match_counter = 0;
        player.currentHP = 1000;
        player.baseHP = 1000;
        player.critChance = 0;
        player.armor = 0;
        player.lifeSteal = 0;
        player.passiveGold = 0;
        $('#hp-count').html(player.currentHP + ' / ' + player.baseHP);
        $('#hp-bar').css('width', player.currentHP/player.baseHP * 100 + '%');
        player.currentGold = 300;
    };

    /** Flips over all cards and shows "Defeat" */
    this.game_over = function() {
        //cancel cards flipping over to show back
        clearTimeout(cards.card_flip_timer);
        $('#defeat').fadeIn();
        $('.card').addClass('card-flip');

    };

    /** Waits until all 18 cards are flipped back, then randomizes cards. */
    var reset_card_primer = function(){
        if(--reset_card_count > 0){
            return;
        }

        cards.remove_cards();
        cards.randomize_cards();

        $('.card').off('transitionend', reset_card_primer);
    };

    /** Calls functions necessary to restart the game. */
    this.reset = function() {
        //increments number of games played
        player.games_played++;

        this.reset_stats(); //set  game stats to 0
        this.display_stats();
        cards.reset_cards(); //reset first and second cards to null

        //if cards are currently animating
        if($('.card-flip').length) {
            reset_card_count = $('.card-flip').length;
            //wait until animation is over, then call function
            $('.card').on('transitionend', reset_card_primer);
        }
        else {
            cards.remove_cards();
            cards.randomize_cards();
        }

        $('.card').removeClass('card-flip'); //flip all cards back

        //remove game over screens
        $('#victory').fadeOut();
        $('#defeat').fadeOut();

        player.update_gold(0);
        player.clear_inventory();

        cards.canClick = true;
    };
}