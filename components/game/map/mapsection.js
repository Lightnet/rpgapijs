/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from '../../hook/usefetch';

export default function MapSection() {

  const [zones, setZones] = useState([]);
  const [zoneID, setZoneID] = useState(null);
  const [maps, setMaps] = useState([]);
  const [mapID, setMapID] = useState(null);

  useEffect(()=>{
    getZones()
  },[]);

  useEffect(()=>{
    getMaps()
  },[zoneID]);

  async function getZones(){
    let data = await useFetch('api/zone');
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH ZONES");
      return;
    }

    if(data.action){
      if(data.action == 'ZONES'){
        console.log("ZONE LIST")
        setZones(data.zones);
      }
    }
  }

  function selectZoneID(id){
    setZoneID(null);
    setZoneID(id);
    console.log(id)
  }

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
        setMaps(data.gamemaps);
      }
    }
  }

  function EnterGameMap(id){
    console.log("MAP ID: ", id);
  }

  return (<>
  <div>
    <div>
    Zone:
    </div>
    <div>
      {zones.map((item)=>{
        return (<div key={item.id}>
          <button onClick={()=>selectZoneID(item.id)}> Name:{item.id} </button>
        </div>);
      })}
    </div>
    <div>
    Maps:
    </div>
    <div>
      {maps.map((item)=>{
        return (<div key={item.id}>
          <button onClick={()=>EnterGameMap(item.id)}> Name:{item.id} </button>
        </div>);
      })}
    </div>
    
  </div>
  </>);
}
