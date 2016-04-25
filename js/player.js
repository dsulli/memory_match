/**
 * Holds all player variables and functions
 * @constructor
 * @this {Player}
 */
function Player() {

    //player stats
    this.match_counter = 0;
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played = 0;
    this.currentHP = 1000;
    this.currentGold = 300;

    //item stats
    this.baseHP = 1000;
    this.critChance = 0;
    this.armor = 0;
    this.lifeSteal = 0;
    this.passiveGold = 0;

    //inventory
    this.inventoryCount = 0;

    /**
     * Changes HP values and displays those changes.
     * @param {number} val - number to update the current HP with
     */
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

    /**
     * Changes gold value and animates gold notification in shop
     * @param {number} val - number to update the current gold with
     */
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

        //update disabled/enabled items
        items.enable_item();

    };

    /** Calculates accuracy and sets it to accuracy variable. */
    this.set_accuracy = function() {
        player.accuracy = Math.round((player.match_counter / player.attempts) * 100);
    };

    /** Takes bought shop item and displays item in player's inventory. */
    this.update_inventory = function(item, name) {
        $('.empty-slot').eq(0).append('<img src="' + item.src + '" alt="' + name + '"></div>').removeClass('empty-slot');
        player.inventoryCount++;

    };

    /** Clears out player's inventory. */
    this.clear_inventory = function() {
        $('#inventory .item-slot').empty().addClass('empty-slot');
        this.inventoryCount = 0;
    };

    /**
     *
     * @param {number} itemcost - cost of item player wants to buy
     * @returns {boolean} - false if player cannot buy item
     */
    this.can_afford = function(itemcost) {
        return this.currentGold >= itemcost;
    };

}

