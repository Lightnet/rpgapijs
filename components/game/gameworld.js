/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

//import Creature from "../../lib/game/creature";

//viusal scene
import RPGMap from "./map/mapsection";
import RPGExplore from "./map/explore";
import RPGBattleSection from "./battle/battlesection";
import RPGHomeBase from "./location/homebase";
import RPGOutpost from "./location/outpost";

//panel
import RPGCharacterStatus from "./entity/character/characterstatus";
import RPGInventory from "./item/inventory/inventorysection";
import RPGStoragePanel from "./item/storage/storage";
import RPGSkillsPanel from "./skills/skillspanel";

import Modal from "../ui/emodal";
import ModalWindow from "../ui/edragwindow";

export default function Component() {

  const {data: session, status} = useSession();

  const [view, setView] = useState("map");

  //window model
  const [isCharacterPanel, setIsCharacterPanel] = useState(false);
  const [isInventoryPanel, setIsInventoryPanel] = useState(false);
  const [isStoragePanel, setIsStoragePanel] = useState(false);
  const [isSkillsPanel, setIsSkillsPanel] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isModalWindow, setIsModalWindow] = useState(false);

  useEffect(()=>{
    console.log("status:",status);
  },[status]);

  //watch change for view
  useEffect(()=>{
    console.log("view:>>",view);
    ViewRender()
  },[view]);

  function openModal(){
    if(isOpenModal){
      setIsOpenModal(false);
    }else{
      setIsOpenModal(true);
    }
  }

  function closeModal(){
    setIsOpenModal(false);
  }

  function ViewRender(){
    console.log("battle...");
    if(view == "battle"){
      return <RPGBattleSection></RPGBattleSection>
    }else if(view == "map"){
      return <RPGMap></RPGMap>
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
      return <label>[ work in progress! ] Loading...</label>
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
        <button onClick={()=>btnAction("battle")}>Battle</button>
        <button onClick={()=>btnAction("character")}>Character</button>
        <button onClick={()=>btnAction("skills")}>Skills</button>
        <button onClick={()=>btnAction("inventory")}>Inventory</button>
        <button onClick={()=>btnAction("storage")}>Storage</button>
        <button onClick={()=>btnAction("homebase")}>HomeBase</button>
        <button onClick={()=>btnAction("outpost")}>Outpost</button>

        <button onClick={()=>openModal()}>Modal</button>
      </div>
      <div style={{
        height:"480px"
        , width:"800px"
        , borderStyle:"solid"
        }}>

        {ViewRender()}
      </div>
      <div>
        {/*
        <ModalWindow
          title="window"
         >
          <p>Move</p>
          <p>this</p>
          <p>DIV</p>
        </ModalWindow>
        */}

        <Modal
          isOpen={isOpenModal}
          closeModal={closeModal}
        >
          <p>Some text in the Modal..</p>
        </Modal>
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