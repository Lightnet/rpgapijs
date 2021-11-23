/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
//import Creature from "../../lib/game/creature";
//viusal scene
import MapSection from "./map/mapsection";
import BattleSection from "./battle/battlesection";
import HomeBase from "./place/homebase/indexsection";
import Outpost from "./place/outpost/outpost";
//panel
import CharacterStatus from "./entity/character/characterstatus";
import RPGInventory from "./item/inventory/inventorysection";
import RPGStoragePanel from "./item/storage/storage";
import SkillSection from "./skills/skillsection";
// UI
//import ModalWindow from "../ui/edragwindow";
import Modal from "../ui/emodal";
import GameMasterSection from "../gamemaster/gamemastersection";
import FooterMenu from "./layout/footermenu";
import useEvent from "../hook/useEvent";

export default function Component() {

  const { status} = useSession();

  const [view, setView] = useState("map");

  //window model
  const [isCharacterPanel, setIsCharacterPanel] = useState(false);
  const [isInventoryPanel, setIsInventoryPanel] = useState(false);
  const [isStoragePanel, setIsStoragePanel] = useState(false);
  const [isSkillsPanel, setIsSkillsPanel] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalWindow, setIsModalWindow] = useState(false);
  const [isGMWindow, setIsGMWindow] = useState(false);

  //useEffect(()=>{
    //console.log("status:",status);
  //},[status]);

  useEvent('api',ops);

  function ops(args){
    console.log('custom event!');
    console.log(args);
    console.log(args.target.view);
    if(args.detail.view){
      btnView(args.detail.view);
    }
  }

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

  function toggleGMWindow(){
    setIsGMWindow(state=>!state);
  }

  function ViewRender(){
    if(view == "battle"){
      return <BattleSection></BattleSection>
    }else if(view == "map"){
      return <MapSection></MapSection>
    }else if(view == "character"){
      return <CharacterStatus></CharacterStatus>
    }else if(view == "skills"){
      return <SkillSection></SkillSection>
    }else if(view == "inventory"){
      return <RPGInventory></RPGInventory>
    }else if(view == "storage"){
      return <RPGStoragePanel></RPGStoragePanel>
    }else if(view == "homebase"){
      return <HomeBase></HomeBase>
    }else if(view == "outpost"){
      return <Outpost></Outpost>
    }else{
      console.log("other view...");
      return <label>[ work in progress! ] Loading...</label>
    }
  }

  function btnView(tag){
    console.log("action: ",tag);
    setView(tag);
  }

  if (status === "authenticated") {
    return (<>
    <div>
      <div>
        <button onClick={()=>toggleGMWindow()}>GM</button>
        <button onClick={()=>btnView("map")}>Map</button>
        <button onClick={()=>btnView("battle")}>Battle</button>
        <button onClick={()=>btnView("character")}>Character</button>
        <button onClick={()=>btnView("inventory")}>Inventory</button>
        <button onClick={()=>btnView("homebase")}>HomeBase</button>
        {/*
        <button onClick={()=>btnView("skills")}>Skills</button>
        <button onClick={()=>btnView("storage")}>Storage</button>
        <button onClick={()=>btnView("outpost")}>Outpost</button>
        <button onClick={()=>openModal()}>Modal</button>
        */}
      </div>
      <div style={{height:"480px", width:"800px", borderStyle:"solid"}}>
        {ViewRender()}
      </div>
      <div>
        <Modal isOpen={isOpenModal} closeModal={closeModal} >
          <p>Some text in the Modal..</p>
        </Modal>
        {isGMWindow && <GameMasterSection></GameMasterSection>}
        <FooterMenu></FooterMenu>
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