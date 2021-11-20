/*
  LICENSE: MIT
  Created by: Lightnet
*/


import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import HomeBase from "./homebase";
import Buildings from "./buildings";
import Construction from "./construction";

export default function Component() {
  //const {data: session, status} = useSession();
  const [view, setView] = useState('home');

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
    <div>
    <div>
      <a href="#" onClick={()=>clickView('home')}> Home Base</a> 
      <a href="#" onClick={()=>clickView('construction')}> Construction</a>
      <a href="#" onClick={()=>clickView('buildings')}> Buildings</a>
    </div>
    <div>
      {renderView()}
    </div>
    </div>
  </>);
}
