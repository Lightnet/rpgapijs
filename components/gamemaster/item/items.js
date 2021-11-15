/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';

export default function AdminItems() {

  async function createItem(){
    let res = await fetch('api/inventory',{
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
  [GM] <button onClick={createItem}> Create Item </button>
  </>);
}