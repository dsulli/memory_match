
function Player() {
    var match_counter = 0;
    var attempts = 0;
    var accuracy = 0;
    var games_played = 0;
    var currentHP = 1000;
    var currentGold = 300;
    var baseHP = 1000;
    var critChance = 0;
    var armor = 0;
    var lifeSteal = 0;
    var passiveGold = 0;
    var inventoryCount = 0;

    var update_hp = function(val) {
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

    };

    var update_gold = function (val) {
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

    };

    var update_inventory = function(item) {
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
     };

    var can_afford = function(itemcost) {
        return currentGold >= itemcost;

    };

}

