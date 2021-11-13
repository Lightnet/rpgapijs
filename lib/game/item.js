/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://hypixel-skyblock.fandom.com/wiki/Rarity

export default class Item{
  constructor(arg){
    if(!arg){
      arg={}
    }
    this.id=arg.id || "";
    this.name=arg.name || "";

    this.description=arg.description || "";
    this.types=arg.types || [];
    this.data=arg.data || [];
    this.isSingle = arg.isSingle || false;
    this.stock = arg.stock || false;
    this.stockmax = arg.stockmax || false;
  }
}

export var ItemType=[
  'USE'
, 'DROP'
, 'CONSUMABLE'
, 'EQUIP'
, 'ITEMQUEST'
, 'MATERIAL'
, 'CRAFTING'
, 'TRADEABLE'
, 'UNTRADEABLE'
, 'SKILL'
, 'WEAPON'
];

export var ItemRankType=[
  'COMMON'
, 'UNCOMMON'
, 'RARE'
, 'EPIC'
, 'LEGENDARY'
, 'MYTHIC'
, 'FAIRY'
, 'DIVINE'
, 'GOD'
, 'ANCIENT'
, 'CELESTIAL'
, 'SPECIAL'
, 'VERYSPECIAL'
];

/*
consumables
legendary

common
Uncommon
rare
epic
legendary
Mythic / fairy
Divine / god
celestial
ancient

Special
Very Special
artifact
*/