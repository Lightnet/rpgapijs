/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from '../../hook/usefetch';

export default function GMMap({zoneid}) {

  //const {data: session, status} = useSession();
  const [zoneID, setZoneID] = useState(null);
  const [gameMaps, setGameMaps] = useState([]);
  
  useEffect(()=>{
    if(zoneid){
      console.log("select zone id", zoneid)
      setZoneID(zoneid);
      getMaps();
    }
  },[zoneid])

  async function getMaps(){
    let data = await useFetch('api/gamemap',{
      method:'POST'
      , body:JSON.stringify({action:'GAMEMAPS',id:zoneID})
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH GET MAPS");
      return;
    }
    if(data.action){
      if(data.action == 'MAPS'){
        console.log("GAMEMAP LIST")
        setGameMaps(data.gamemaps);
      }
    }
  }

  async function createMap(){
    console.log(zoneID)
    if(!zoneID){
      console.log('NULL ZONE ID');
      return;
    }

    let data = await useFetch('api/gamemap',{
      method:'POST'
      , body:JSON.stringify({
        action:'CREATE',
        name:'test',
        id:zoneID
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH CREATE GAME MAP");
      return;
    }
    if(data.action){
      if(data.action == 'CREATE'){
        console.log("CREATE GAMEMAP")
        setGameMaps([...gameMaps, data.gamemap]);
      }
    }
  }

  async function deleteMapID(id){
    console.log(zoneID)
    if(!zoneID){
      console.log('NULL ZONE ID');
      return;
    }

    let data = await useFetch('api/gamemap',{
      method:'DELETE'
      , body:JSON.stringify({
        id:id
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH DELETE GAME MAP");
      return;
    }
    if(data.action){
      if(data.action == 'DELETE'){
        console.log("DELETE GAMEMAP")
        setGameMaps(gameMaps.filter(item=>item.id !== data.id));
      }
    }
  }

  return (<>
    <div>
      <button onClick={createMap}>Create Map</button>  <label>Zone count: {gameMaps.length}</label> <label>ID: {zoneID}</label>
      <br />
      <label>Maps:</label>
    </div>
    {gameMaps.map((item)=>{
      return(
      <div key={item.id}>
        <label> Name:{item?.name} </label><button onClick={()=>deleteMapID(item.id)}>DELETE</button>
      </div>);
    })}
  </>);
}
