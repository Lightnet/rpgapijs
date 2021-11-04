/*
  LICENSE: MIT
  Created by: Lightnet

*/
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Component() {
  //const {data: session, status} = useSession();
  const [isBattle, setIsBattle] = useState(false);
  const [entities, setEntities] = useState([]);
  console.log(uuidv4());


  async function randomBattle(){
    console.log("querry battle...");
    let response = await fetch('api/battle',{
      method:'GET' // *GET, POST, PUT, DELETE, etc.
    })
    let data = await response.json();
    console.log(data);
    if((data.message=="FOUND") || (data.message=="CREATED")){
      let objs = JSON.parse(data.data);
      console.log(objs);
      //let objmap =new Map();
      //objs.forEach((item)=>{
        //objmap.set(item.id, item);
      //})

      //objs.map((item)=>{
        //console.log(item.id);
        //console.log(item);
        //console.log(item.name);
      //})
      
      setEntities(objs);
      setIsBattle(true);
    }
  }

  async function playerAttack(){
    let response = await fetch('api/battle',{
      method:'POST' // *GET, POST, PUT, DELETE, etc.
      , body:JSON.stringify({
        action:'attack'
        , type:'normal' //weapon attack
      })
    });
    
    let data = await response.json();
    console.log(data);

    //server cal battle
    if(data.message=="UPDATE"){
      let objs = JSON.parse(data.data);
      setEntities(objs);
    }
  }


  return (<>
    <div>
      {(!isBattle) && <button onClick={randomBattle}>Random Battle</button>}

      {(isBattle) &&(
        <>
          <label>FOUND BATTLE:</label>
          <button onClick={playerAttack}>Action Attack</button>
          {entities.map((item)=>{
            return (
              <div key={item.id}>
                <label>Name: {item.name} </label>
                <br />
                <label>Health: {item.healthpoint} / {item.healthpointmax} </label>
                <br />
              </div>
            )
          })}
        
        
        </>
      )}
    </div>
  </>);
}