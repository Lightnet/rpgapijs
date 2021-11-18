/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from "../../hook/usefetch";
import GMMap from "../map/gmmap";

export default function GMZone() {

  //const {data: session, status} = useSession();
  const [zones, setZones] = useState([]);
  const [zoneID, setZoneID] = useState(null);

  useEffect(()=>{
    getZones()
  },[])

  async function getZones(){
    let data = await useFetch('api/zone',{
      method:'GET'
    });
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
  
  async function createZone(){
    let data = await useFetch('api/zone',{
      method:'POST'
      , body:JSON.stringify({
        action:'CREATE'
      })
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH CREATE ZONE')
      return;
    }
    if(data.action){
      if(data.action == 'CREATE'){
        console.log("CREATE ZONE")
        setZones([...zones,data.zone]);
      }
    }
  }

  async function deleteZone(id){
    let data = await useFetch('api/zone',{
      method:'DELETE'
      , body:JSON.stringify({
        id:id
      })
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH DELETE ZONE')
      return;
    }
    if(data.action){
      if(data.action == 'DELETE'){
        console.log("DELETE ZONE")
        setZones(zones.filter(item=>item.id !== data.id));
      }
    }
  }

  function selectZoneID(id){
    setZoneID(null);
    setZoneID(id);
  }

  return (<>
    <div>
      <button onClick={createZone}>Create Zone</button> <label>Zone count: {zones.length}</label>
    </div>

    <div>
      {zones.map((item)=>{
        return (<div key={item.id}>
          <button onClick={()=>selectZoneID(item.id)}> Name:{item.id} </button> <button onClick={()=>deleteZone(item.id)}> DELETE </button>
        </div>);
      })}
    </div>
    <GMMap zoneid={zoneID}></GMMap>
  </>);
}
