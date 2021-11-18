/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';

export default function GMCreature() {

  async function createItem(){
    let res = await fetch('api/creature',{
      method:'POST'
      , body:JSON.stringify({
        action:'CREATE'
      })
    });
    let data = await res.json();
    console.log(data);
    if(data.action){
      if(data.action == 'CREATE'){
        console.log("CREATE ITEM")
        //items.push(data.item);
        //setItems([]);
        //setItems(items);
      }
    }
  }

  return (<>
    <button onClick={createItem}> Create creature </button>
  </>);
}