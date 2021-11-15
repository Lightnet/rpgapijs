/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';

export default function BatteTurnBase() {

  const [isBattle, setIsBattle] = useState(false);
  const [entities, setEntities] = useState([]);
  const [isFinishBattle, setIsFinishBattle ] = useState(false);

  useEffect(()=>{
    queryCheckBattle();
  },[]);

  async function queryCheckBattle(){
    let response = await fetch('api/battle/battleturn',{
      method:'GET' // *GET, POST, PUT, DELETE, etc.
    })
    let data = await response.json();
    console.log(data);
    if((data.action=="UPDATE") || (data.action=="CREATED")){
      //let battlefield = JSON.parse(data.battlefield);
      let battlefield = data.battlefield;
      console.log(battlefield);

      //battlefield.ally[0]
      let objs = [];
      objs.push(battlefield.foe[0]);
      objs.push(battlefield.ally[0]);
      
      setEntities(objs);
      setIsBattle(true);
    }
  }

  //need to fixed this later
  async function randomBattle(){
    console.log("querry battle...");
    let response = await fetch('api/battle/battleturn',{
      method:'POST' // *GET, POST, PUT, DELETE, etc.
      , body:JSON.stringify({
        action:'RANDOMBATTLE'
        , type:'normal' //weapon attack
      })
    })
    let data = await response.json();
    console.log(data);
    if((data.action=="FOUND") || (data.action=="CREATED")){
      let battlefield = data.battlefield;
      console.log("battlefield>>>>>>>>>>>>>");
      console.log(battlefield);
      let objs = [];
      objs.push(battlefield.foe[0]);
      objs.push(battlefield.ally[0]);
      setEntities(objs);
      setIsBattle(true);
      setIsFinishBattle(false);
    }
  }

  async function playerAttack(){
    let response = await fetch('api/battle/battleturn',{
      method:'POST' // *GET, POST, PUT, DELETE, etc.
      , body:JSON.stringify({
        action:'BATTLE'
        , type:'normal' //weapon attack
      })
    });
    
    let data = await response.json();
    console.log(data);

    //server cal battle
    if(data.action=="UPDATE"){
      let battlefield = data.battlefield;
      console.log(battlefield);
      battlefield.ally[0]
      let objs = [];
      objs.push(battlefield.foe[0]);
      objs.push(battlefield.ally[0]);
      setEntities(objs);
    }

    if(data.action=="NOBATTLE"){
      //clear battle data
      setEntities([]);
      setIsBattle(false)
    }

    if(data.action=="BATTLEFINISH"){
      //clear battle data
      setEntities([]);
      setIsBattle(false);

      setIsFinishBattle(true);
    }
  }

  return (<>
    <div>
      {(!isBattle) && <button onClick={()=>randomBattle()}>Random Battle</button>}

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
      {(isFinishBattle)&&(
        <>
          <label>Finish Battle</label>
        </>
      )}
    </div>
  </>);
}