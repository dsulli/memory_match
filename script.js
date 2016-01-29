var first_card = null;
var second_card = null;
var match_counter = 0;
var total_matches = 4;
var canClick = true;

function showBack(first, second) {
    setTimeout(function(){
        first.find('.back').show();
        second.find('.back').show();
        canClick = true;
    }, 1000);
}

function reset() {
    first_card = null;
    second_card = null;
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
        if(first_card.find('.front img').attr('src') == second_card.find('.front img').attr('src')) {

            match_counter++;
            console.log(match_counter);
            reset();

            if(match_counter === total_matches) {
                var victory_div = $('<div>', {
                   id: 'victory',
                    text: 'Victory'
                });
                $('body').append(victory_div);
            }
            else {
                return;
            }
        }
        else { //cards don't match
            canClick = false;
            showBack(first_card, second_card);
            reset();
            return;
        }
    }
}

$(document).ready(function() {

    $('.card').click(function() {
        card_clicked($(this));
    });

});