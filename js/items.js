function Item(cost, type, src, effect) {
    this.cost = cost;
    this.type = type;
    this.src = src;
    this.effect = effect;
}

function Items() {

    var itemList = {
        'Health Potion': new Item(150, 'consume', 'images/items/item_hp.jpg', function() { player.update_hp(50); }),
        'Cloth Armor': new Item(400, 'passive', 'images/items/item_clotharmor.jpg', function() { player.armor += 0.2; }),
        'Kindlegem': new Item(800, 'passive', 'images/items/item_kindlegem.jpg', function() { player.baseHP += 200; player.update_hp(200);}),
        'Ancient Coin': new Item(300, 'passive', 'images/items/item_ancientcoin.jpg', function() { player.passiveGold += 30; }),
        'Vampiric Scepter': new Item(900, 'passive', 'images/items/item_vampiricscepter.jpg', function() { player.lifeSteal += 30; }),
        'Brawlers Gloves': new Item(500, 'passive', 'images/items/item_brawlersgloves.jpg', function() { player.critChance += .1; })
    };

    this.enable_item = function() {

        $('.shop-item .item-slot').each(function() {
            var item = itemList[$(this).find('img').attr('alt')];
            if(!player.can_afford(item.cost)) {
                $(this).addClass('disabled');
            }
            else {
                $(this).removeClass('disabled');
            }
        });


    };


    this.item_clicked = function(item) {
        var item_name = item.find('img').attr('alt');
        var item_bought = itemList[item_name];

        if(player.can_afford(item_bought.cost)) {

            //check if item is a passive and if can be put in inventory
            if(item_bought.type == "passive" && player.inventoryCount < game.max_inventory_size){
                player.update_inventory(item_bought, item_name);
                item_bought.effect();
                player.update_gold(-(item_bought.cost));

            }
            else if(item_bought.type == "consume") {
                item_bought.effect();
                player.update_gold(-(item_bought.cost));
            }
        }

    };


}