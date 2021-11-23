/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

import { ItemType } from "../../../../lib/game/item";
import { useInventory } from "../../gameprovider";

export default function Inventory() {

  const {data: session, status} = useSession();
  const [items, setItems] = useState([]);

  const [inventory, setInventory] = useInventory();

  useEffect(()=>{
    console.log(ItemType);
    //setInventory([])
    console.log(typeof setInventory)
    setInventory([])
    console.log(typeof inventory)
    console.log(inventory)
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

  async function deleteItem(id){
    if(!id){
      return;
    }
    let res = await fetch('api/inventory',{
      method:'POST'
      , body:JSON.stringify({
        action:'DELETE'
      , id:id
      })
    });
    let data = await res.json();
    console.log(data);
    if(data.action){
      if(data.action == 'DELETE'){
        for(let i=0;i<items.length;i++  ){
          if(items[i].id == data.id){
            items.splice(i,1);
            break;
          }
        }
        setItems([]);
        setItems(items);
      }
    }
  }

  return (<>
    <div>
      <div>Inventory  </div>
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
                <button onClick={()=>deleteItem(ent.id)}>Delete</button>
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

*/