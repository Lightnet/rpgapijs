/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import GMItem from "./item/gmitem";
import GMZone from "./map/gmzone";
import GMCreature from "./creature/gmcreature";

export default function GameMasterSection() {
  //const {data: session, status} = useSession();
  const [view, setView] = useState('zone');

  useEffect(()=>{
    console.log("init Game master!")
    return ()=>{
      console.log('CLEAN UP GM TOOLS');
    }
  });

  function renderView(){
    if(view == "zone"){
      return <GMZone></GMZone>
    }else if(view == 'creature'){
      return <GMCreature></GMCreature>
    }else if(view == 'item'){
      return <GMItem></GMItem>
    }

    return <></>
  }

  return (<>
  <div style={{position:'fixed',top:'0px',right:'0px',border:'solid',width:'400px',height:'100%'}}>
    <div>Game Master Tools:</div>
    <div>
      <a href='#' onClick={()=>setView('zone')}>Zone</a> <span> | </span>
      <a href='#' onClick={()=>setView('creature')}>Creature</a> <span> | </span>
      <a href='#' onClick={()=>setView('item')}>Item</a> <span> | </span>
      <a href='#' onClick={()=>setView('users')}>Users</a> <span> | </span>
    </div>
    {renderView()}
  </div>
  </>);
}
/*
<a href='#'>Map</a>
<a href='#'>Map Objects</a>

*/