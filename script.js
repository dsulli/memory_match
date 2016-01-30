var first_card = null;
var second_card = null;
var match_counter = 0;
var total_matches = 9; //change this when you add more cards
var canClick = true;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

//function for when first and second cards don't match, shows the backs of them again
function showBack(first, second) {
    canClick = false;
    setTimeout(function(){
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
        }

        //refresh stats after every attempt
        display_stats();
    }
}

$(document).ready(function() {

    display_stats();

    $('.card').click(function() {
        card_clicked($(this));
    });

    $('.reset').click(function() {
       games_played++;
        reset_stats();
        display_stats();
        $('.back').show();
        $('#victory').fadeOut();
    });

});