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
  },[])

  function Itemused(){

  }

  return (<>
    <div>
      <div>Inventory...</div>
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

          </tbody>
        </table>
      </div>
    </div>
  </>);
}
