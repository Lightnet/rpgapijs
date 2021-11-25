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
import {isEmpty} from "../../../../lib/helper"

export default function Component() {
  //const {data: session, status} = useSession();
  const [view, setView] = useState('home');
  const [isCreated,setIsCreated] = useState(false);
  const [baseName, setBaseName] = useState('');
  const [homeBaseInfo, setHomeBaseInfo] =  useState('');

  const [isloading,setIsloading] = useState(true);
  const [isEdit,setIsEdit] = useState(false);


  useEffect(() => {
    checkHomeBase();
    return () => {
    }
  }, [])

  async function checkHomeBase(){
    setIsloading(true)
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
        setIsloading(false)
      }
      if(data.homebase){
        setIsCreated(true);
        setHomeBaseInfo(data.homebase[0])
        setBaseName(data.homebase[0].name)
        setIsloading(false)
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

  async function updateBaseName(name){
    let data = await useFetch('api/homebase',{
      method:'PATCH',
      body:JSON.stringify({action:'UPDATENAME',name:name})
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error UPDATE name');
      return
    }
    if(data.action){
      if(data.action=='UPDATE'){
        console.log("UPDATE NAME...")
      }
    }
    
  }

  function inputEnterName(e){
    if(e.keyCode == 13){
      setIsEdit(false)
      if(isEmpty(e.target.value)){
        return;
      }
      updateBaseName(e.target.value)
      return;
    }
  }

  function clickEdit(){
    setIsEdit(true);
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

  if(isloading){
    return <label>Loading...</label>
  }
  
  return (<>
    {isCreated ? (
    <div>
        {isEdit?(
          <div>
            <input value={baseName} onChange={onBaseName} onKeyUp={inputEnterName} />
          </div>
        ):(
          <div>
          <label>Home Base Name: {baseName}</label><button onClick={clickEdit}>Edit</button>
          </div>
        )}
      <div>
        
        <a href="#" onClick={()=>clickView('home')}>Home</a><span> | </span>
        <a href="#" onClick={()=>clickView('construction')}>Construction</a><span> | </span>
        <a href="#" onClick={()=>clickView('buildings')}>Buildings</a>
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
