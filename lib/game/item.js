/*
  LICENSE: MIT
  Created by: Lightnet
*/

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