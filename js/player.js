
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

        var hp_text = $('#hp-count');
        var hp_bar = $('#hp-bar');

        //if current HP goes to 0 or below, it's game over
        if(this.currentHP + val <= 0) {
            hp_text.text(0 + ' / ' + this.baseHP);
            hp_bar.css('width', 0);
            game.game_over();
            return;
        }
        //prevents hp from going above max
        else if (this.currentHP + val > this.baseHP) {
            hp_text.text(this.baseHP + ' / ' + this.baseHP);
            return;
        }
        else {
            this.currentHP += val;
            hp_text.text(this.currentHP + ' / ' + this.baseHP);
        }

        hp_bar.css('width', this.currentHP/this.baseHP * 100 + '%');

    };

    this.update_gold = function (val) {

        this.currentGold += val;
        $('#total-gold').html(this.currentGold);

        //animate the total player gold div
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

    this.update_inventory = function(item, name) {
        $('.empty-slot').eq(0).append('<img src="' + item.src + '" alt="' + name + '"></div>').removeClass('empty-slot');
        player.inventoryCount++;

    };

    this.clear_inventory = function() {
        $('#inventory .item-slot').empty().addClass('empty-slot');

        this.inventoryCount = 0;
    };

    this.can_afford = function(itemcost) {
        return this.currentGold >= itemcost;
    };

}

