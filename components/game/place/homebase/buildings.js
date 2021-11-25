/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/16240313/javascript-how-to-add-n-minutes-to-unix-timestamp/16240373

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from '../../../hook/usefetch';
import TimeBuild from '../../../ui/timebuild';

export default function Buildings() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getHomeBaseObjects();
    return () => {
    }
  }, [])
  
  async function getHomeBaseObjects(){
    let data = await useFetch('api/building')
    if(data.error){
      console.log('Fetch Error GET Buildings');
      return;
    }
    if(data){
      if(data.action){
        if(data.action='BUILDINGS'){
          console.log(data.buildings);
          setBuildings(data.buildings);
        }
      }
    }
  }

  async function clickBuild(id){
    let data = await useFetch('api/building',{
      method:'PATCH',
      body: JSON.stringify({
        id:id,
        mode:'BUILD'
      })
    });
    if(data.error){
      console.log('Fetch Error Build Time');
    }
    if(data.action){
      if(data.action=='BUILDTIME'){
        console.log(data);
        setBuildings(buildings.map(item=>{
          if(item.id == id){
            //item.mode='BUILD'
            //item.buildtime=data.time
            return {...item,buildtime:data.time,mode:'BUILD'};
          }else{
            return item;
          }
        }))
      }
      if(data.action=='BUILDFINISH'){
        console.log(data);
        setBuildings(buildings.map(item=>{
          if(item.id == id){
            item.mode='idle'
            item.buildtime=data.time
            return item;
          }else{
            return item;
          }
        }))
      }
    }
  }

  function clickStart(id){

  }

  function queryRender(item){
    if((item.buildtime > 1) &&(item.mode == 'idle')) {
      return <button onClick={()=>clickBuild(item.id)}>Build</button>
    }else if((item.buildtime > 1) &&(item.mode == 'BUILD')){
      return (
      <>
      <button onClick={()=>clickBuild(item.id)}>Check Build Time</button> 
      <TimeBuild timedate={item.buildtime}></TimeBuild>
      </>)
    }else{
      return <button onClick={clickStart}>Start</button>
    }
  }

  return (<>
    <div>
      <div>
        <label>Buildings</label>
      </div>
      <div>
        {buildings.map(item=>{
          return (<div key={item.id}>
             <label>Name:{item.name}</label> <label>Mode:{item.mode}</label>
            {queryRender(item)}
            </div>)
        })}
      </div>
    </div>
  </>);
}
