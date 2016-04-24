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
       /* var item;
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

        }*/

        for(var listItem in itemList) {
            $('.shop-item .item-slot').each(function() {
                if($(this).find('img').attr('alt') === listItem) {
                    if(!player.can_afford(itemList[listItem].cost)) {
                        $(this).addClass('disabled');
                    }
                    else {
                        $(this).removeClass('disabled');
                    }
                }
            })
        }

    };


    this.item_clicked = function(item) {
        var item_name = item.find('img').attr('alt');
        var item_bought;

        console.log("item was clicked");

        //search for that item's info
        /*for(var i = 0; i < items.length; i++) {
            if(item.find('img').attr('alt') == items[i].name) {
                item_bought = items[i];
            }
        }*/

        for(var listItem in itemList) {
            if(item_name == listItem) {
                item_bought = itemList[listItem];
            }
        }

        console.log(item_bought.cost);
        if(item_name != 'Health Potion' && player.inventoryCount > 3) {
            return;
        }
        //Check if item can be bought
        if(player.can_afford(item_bought.cost)) {

            //check if item is a consumable, then use immediately
            if(item_bought.type == "consume"){
                item_bought.effect();
            }

            //check if item is a passive item, then put into inventory
            if(item_bought.type == "passive") {
                player.update_inventory(item_bought);
                item_bought.effect();
            }

            //subtract item cost from current gold
            player.update_gold(-(item_bought.cost));
            if(item_bought.name != 'Health Potion') {
                player.inventoryCount++;
            }

        }

    }


}