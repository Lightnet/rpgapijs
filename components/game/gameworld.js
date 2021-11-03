/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

//import Creature from "../../lib/game/creature";

import Map from "./map/map";
import Explore from "./map/explore";
import BattleScene from "./battle/battlescene";
import CharacterStatus from "./entity/characterstatus";
import Inventory from "./item/inventory";
import Storage from "./item/storage";
import HomeBase from "./location/homebase";
import Outpost from "./location/outpost";
import SkillsPanel from "./skills/skillspanel";

export default function Component() {

  const {data: session, status} = useSession();

  const [view, setView] = useState("");

  useEffect(()=>{
    console.log("status:",status);
  },[status]);

  //watch change for view
  useEffect(()=>{
    console.log("view:>>",view);
    ViewRender()
  },[view]);

  function ViewRender(){
    console.log("battle...");
    if(view == "battle"){
      return <BattleScene></BattleScene>
    }else if(view == "map"){
      return <Map></Map>
    }else if(view == "explore"){
      return <Explore></Explore>
    }else if(view == "character"){
      return <CharacterStatus></CharacterStatus>
    }else if(view == "skills"){
      return <SkillsPanel></SkillsPanel>
    }else if(view == "inventory"){
      return <Inventory></Inventory>
    }else if(view == "storage"){
      return <Storage></Storage>
    }else if(view == "homebase"){
      return <HomeBase></HomeBase>
    }else if(view == "outpost"){
      return <Outpost></Outpost>
    }else{
      console.log("other scene...");
      return <label>Loading...</label>
    }
  }

  function btnAction(tag){
    console.log("action: ",tag);
    setView(tag);
  }

  if (status === "authenticated") {
    return (<>
    <div>
      <div>
        <button onClick={()=>btnAction("map")}>Map</button>
        <button onClick={()=>btnAction("explore")}>Explore</button>
        <button onClick={()=>btnAction("battle")}>Battle</button>
        <button onClick={()=>btnAction("character")}>Character</button>
        <button onClick={()=>btnAction("skills")}>Skills</button>
        <button onClick={()=>btnAction("inventory")}>Inventory</button>
        <button onClick={()=>btnAction("storage")}>Storage</button>
        <button onClick={()=>btnAction("homebase")}>HomeBase</button>
        <button onClick={()=>btnAction("outpost")}>Outpost</button>
      </div>
      <div style={{
        height:"480px"
        , width:"800px"
        , borderStyle:"solid"
        }}>

        {ViewRender()}

      </div>
      </div>
    </>);
  }


  return (<>
    <div>Loading...</div>
  </>);
}
/*




*/