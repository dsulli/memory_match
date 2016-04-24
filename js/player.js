
function Player() {
    this.match_counter = 0;
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played = 0;
    this.currentHP = 1000;
    this.currentGold = 300;
    this.baseHP = 1000;
    this.critChance = 0;
    this.armor = 0;
    this.lifeSteal = 0;
    this.passiveGold = 0;
    this.inventoryCount = 0;

    this.update_hp = function(val) {
        if(this.currentHP + val <= 0) {
            $('#hp-count').html(0 + ' / ' + this.baseHP);
            $('#hp-bar').css('width', 0);
            game.game_over();
            return;
        }
        else if (this.currentHP + val > this.baseHP) {
            $('#hp-count').html(this.baseHP + ' / ' + this.baseHP);
            return;
        }
        else {
            this.currentHP += val;
            $('#hp-count').html(this.currentHP + ' / ' + this.baseHP);
        }
        $('#hp-bar').css('width', this.currentHP/this.baseHP * 100 + '%');

    };

    this.update_gold = function (val) {
        if(this.currentGold + val < 0) {
            return;
        }

        this.currentGold += val;
        $('#total-gold').html(this.currentGold);


        if(val !== 0) {
            $('.gold').addClass('gold-active');
            setTimeout(function(){
                $('.gold').removeClass('gold-active');
            }, 500);
        }
        items.enable_item();

    };

    //only set accuracy when called so it doesn't divide 0 by 0
    this.set_accuracy = function() {
        player.accuracy = Math.round((player.match_counter / player.attempts) * 100);
    };

    this.update_inventory = function(item) {
    /*
     loop through item slots
     check if empty
     if empty, put purchased item into slot
     if not empty, move on
     if there are no empty slots, do nothing, don't buy item
    */

         for(var i = 0; i < 3; i++) {
             if($('#inventory .item-slot:nth-child(' + (i + 1) + ')').html() == '') {
                 $('#inventory .item-slot:nth-child(' + (i + 1) + ')').append('<img src="' + item.src + '"></div>');
                 return;
             }
         }
     };

    this.clear_inventory = function() {
        $('#inventory .item-slot').empty();
        this.inventoryCount = 0;
    };

    this.can_afford = function(itemcost) {
        return this.currentGold >= itemcost;
    };

}

