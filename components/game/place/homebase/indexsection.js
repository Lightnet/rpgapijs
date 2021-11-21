/*
  LICENSE: MIT
  Created by: Lightnet
*/


//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import HomeBase from "./homebase";
import Buildings from "./buildings";
import Construction from "./construction";
import useFetch from "../../../hook/usefetch";

export default function Component() {
  //const {data: session, status} = useSession();
  const [view, setView] = useState('home');
  const [isCreated,setIsCreated] = useState(false);
  const [baseName, setBaseName] =  useState('');
  const [homeBaseInfo, setHomeBaseInfo] =  useState('');

  useEffect(() => {
    checkHomeBase();
    return () => {
    }
  }, [])

  async function checkHomeBase(){
    console.log('check home base')
    let data = await useFetch('api/homebase');
    console.log(data);
    if(data.error){
      console.log('Fetch Error GET HomeBase');
      return;
    }
    if(data.action=='HOMEBASE'){
      if(data.homebase==null){
        setIsCreated(false);
      }
      if(data.homebase){
        setIsCreated(true);
        setHomeBaseInfo(data.homebase[0])
        setBaseName(data.homebase[0].name)
      }
    }
  }

  async function createBaseName(){
    console.log("BaseName: ",baseName);
    
    let data = await useFetch('api/homebase',{
      method:'POST',
      body:JSON.stringify({name:baseName})
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error GET HomeBase');
      return;
    }
    if(data.action=='HOMEBASE'){
      if(data.homebase==null){
        setIsCreated(false);
      }
      if(data.homebase){
        setIsCreated(true);
        setHomeBaseInfo(data.homebase)
        setBaseName(data.homebase.name)
      }
    }
  }

  function onBaseName(e){
    setBaseName(e.target.value);
  }

  function clickView(name){
    setView(name)
  }

  function renderView(){
    if(view=='home'){
      return <HomeBase></HomeBase>
    }else if (view=='buildings'){
      return <Buildings></Buildings>
    }else if (view=='construction'){
      return <Construction></Construction>
    }
    return <></>
  }

  return (<>
    {isCreated ? (
    <div>
      <div>
        <label>Home Base Name: {baseName}</label>
      </div>
      <div>
        
        <a href="#" onClick={()=>clickView('home')}> Home </a> 
        <a href="#" onClick={()=>clickView('construction')}> Construction</a>
        <a href="#" onClick={()=>clickView('buildings')}> Buildings</a>
      </div>
      <div>
        {renderView()}
      </div>
    </div>  
    ):(
    <div>
      <label>Home Base Name:</label><input value={baseName} onChange={onBaseName} />
      <br />
      <button onClick={createBaseName}> Create </button>
    </div>
    )}
  </>);
}
