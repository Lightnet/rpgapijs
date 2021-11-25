/*
  LICENSE: MIT
  Created by: Lightnet
*/


import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { getConstruction } from "../../../../lib/game/construction";
import useFetch from "../../../hook/usefetch";

export default function Construction() {

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getHomeBaseObjects();
    //console.log(getConstruction())
    setBuildings(getConstruction())
    return () => {
    }
  }, [])


  useEffect(() => {
    //console.log(buildings)
    return () => {
    }
  }, [buildings])
  
  async function getHomeBaseObjects(){

  }

  async function buildBuiilding(item){
    console.log(item)
    let data = await useFetch('api/building',{
      method:'POST',
      body:JSON.stringify({action:'CREATE',building:item})
    });
  }


  return (<>
    <div>
      <div>
        <label>Construction</label>
      </div>
      <div>
        {buildings.map((item,i)=>{
          //console.log(item);
          //console.log(i);
          return (<div key={i}><label>Name:{item.name}</label><button onClick={()=>buildBuiilding(item)}> Create </button>  </div>);
          //return (<label>Name:{item.name}</label>);
        })}
      </div>
    </div>
  </>);
}
/*

*/
