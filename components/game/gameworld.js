/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

//import Creature from "../../lib/game/creature";

//viusal scene
import RPGMap from "./map/map";
import RPGExplore from "./map/explore";
import RPGBattleScene from "./battle/battlescene";
import RPGHomeBase from "./location/homebase";
import RPGOutpost from "./location/outpost";

//panel
import RPGCharacterStatus from "./entity/characterstatus";
import RPGInventory from "./item/inventory";
import RPGStoragePanel from "./item/storage";
import RPGSkillsPanel from "./skills/skillspanel";

export default function Component() {

  const {data: session, status} = useSession();

  const [view, setView] = useState("");

  //window model
  const [isCharacterPanel, setIsCharacterPanel] = useState(false);
  const [isInventoryPanel, setIsInventoryPanel] = useState(false);
  const [isStoragePanel, setIsStoragePanel] = useState(false);
  const [isSkillsPanel, setIsSkillsPanel] = useState(false);

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
      return <RPGBattleScene></RPGBattleScene>
    }else if(view == "map"){
      return <RPGMap></RPGMap>
    }else if(view == "explore"){
      return <RPGExplore></RPGExplore>
    }else if(view == "character"){
      return <RPGCharacterStatus></RPGCharacterStatus>
    }else if(view == "skills"){
      return <RPGSkillsPanel></RPGSkillsPanel>
    }else if(view == "inventory"){
      return <RPGInventory></RPGInventory>
    }else if(view == "storage"){
      return <RPGStoragePanel></RPGStoragePanel>
    }else if(view == "homebase"){
      return <RPGHomeBase></RPGHomeBase>
    }else if(view == "outpost"){
      return <RPGOutpost></RPGOutpost>
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