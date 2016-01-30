var first_card = null;
var second_card = null;
var match_counter = 0;
var total_matches = 2;
var canClick = true;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function showBack(first, second) {
    setTimeout(function(){
        first.find('.back').show();
        second.find('.back').show();
        canClick = true;
    }, 1000);
}

function reset_cards() {
    first_card = null;
    second_card = null;
}

function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + "%");
}

function reset_stats() {
    attempts = 0;
    accuracy = 0;
    match_counter = 0;
}

function set_accuracy() {
    accuracy = Math.round((match_counter / attempts) * 100);
}

function show_victory() {

}

function card_clicked(current) {

    if(canClick === false || current.find('.back').css('display') == 'none') {
        return;
    }

    current.find('.back').hide();
    if(first_card == null) {
        first_card = current;
        return;
    }
    else {
        second_card = current;
        attempts++;
        console.log("attempts: ", attempts);
        if(first_card.find('.front img').attr('src') == second_card.find('.front img').attr('src')) {

            match_counter++;
            set_accuracy();
            console.log("matches: ", match_counter);
            reset_cards();

            if(match_counter === total_matches) {
                $('#victory').show();
            }
            else {
            }
        }
        else { //cards don't match
            canClick = false;
            showBack(first_card, second_card);
            reset_cards();
        }


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
        $('#victory').hide();
    });

});