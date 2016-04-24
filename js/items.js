function Item(cost, type, src, effect) {
    this.cost = cost;
    this.type = type;
    this.src = src;
    this.effect = effect;
}

function Items() {

    var itemList = {
        'Health Potion': new Item(150, 'consume', 'images/items/item_hp.jpg', function() { update_hp(50); }),
        'Cloth Armor': new Item(400, 'passive', 'images/items/item_clotharmor.jpg', function() { armor += 0.2; }),
        'Kindlegem': new Item(800, 'passive', 'images/items/item_kindlegem.jpg', function() { baseHP += 200; update_hp(200);}),
        'Ancient Coin': new Item(300, 'passive', 'images/items/item_ancientcoin.jpg', function() { passiveGold += 30; }),
        'Vampiric Scepter': new Item(900, 'passive', 'images/items/item_vampiricscepter.jpg', function() { lifeSteal += 30; }),
        'Brawlers Gloves': new Item(500, 'passive', 'images/items/item_brawlersgloves.jpg', function() { critChance += .1; })
    };

    var enable_item = function() {
        var item;
        for(var i = 0; i < items.length; i++) {
            for(var j = 0; j < items.length; j++) {
                if($('.shop-item .item-slot').eq(i).find('img').attr('alt') === items[j].name) {
                    item = items[j];
                    if(!can_afford(item.cost)) {
                        $('.shop-item .item-slot').eq(i).addClass('disabled');
                    }
                    else {
                        $('.shop-item .item-slot').eq(i).removeClass('disabled');
                    }
                }
            }

        }

    };


    var item_clicked = function(item) {
        var item_bought;

        console.log("item was clicked");

        //search for that item's info
        for(var i = 0; i < items.length; i++) {
            if(item.find('img').attr('alt') == items[i].name) {
                item_bought = items[i];
            }
        }

        console.log(item_bought.cost);
        if(item_bought.name != 'Health Potion' && inventoryCount > 3) {
            return;
        }
        //Check if item can be bought
        if(currentGold >= item_bought.cost) {

            //check if item is a consumable, then use immediately
            if(item_bought.type == "consume"){
                item_bought.effect();
            }

            //check if item is a passive item, then put into inventory
            if(item_bought.type == "passive") {
                update_inventory(item_bought);
                item_bought.effect();
            }

            //subtract item cost from current gold
            update_gold(-(item_bought.cost));
            if(item_bought.name != 'Health Potion') {
                inventoryCount++;
            }

        }

    }


}