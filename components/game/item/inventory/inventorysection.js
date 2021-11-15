/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

import { ItemType } from "../../../../lib/game/item";

export default function Inventory() {

  const {data: session, status} = useSession();
  const [items, setItems] = useState([]);

  useEffect(()=>{
    console.log(ItemType);
    getInventory();
  },[])

  async function getInventory(){
    let res = await fetch('api/inventory',{
      method:'GET'
    });
    let data = await res.json();
    console.log(data);
    if(data.action == 'ITEMS'){
      setItems([])
      setItems(data.inventory)
    }
  }

  function Itemused(){

  }

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

        items.push(data.item);
        setItems([]);
        setItems(items);
      }
    }
  }

  return (<>
    <div>
      <div>Inventory <button onClick={createItem}> Create Item </button> </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                Name:
              </td>
              <td>
                Stock:
              </td>
              <td>
                Actions:
              </td>
            </tr>

            {items.map((ent)=>{
              return(
            <tr key={ent.id}>
              <td>
                {ent.name}
              </td>
              <td>
                {ent.stock}/{ent.stockmax}
              </td>
              <td>
                <button>Use</button>
              </td>
            </tr>)
            })}

          </tbody>
        </table>
      </div>
    </div>
  </>);
}
/*

            <tr>
              <td>
                Test
              </td>
              <td>
                0/0
              </td>
              <td>
                <button>Use</button>
              </td>
            </tr>
*/
