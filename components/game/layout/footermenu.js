/*
  LICENSE: MIT
  Created by: Lightnet
*/

import styles from "./footermenu.module.css";
//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useDispatch from "../../hook/usedispatch";

export default function FooterMenu() {
  //const {data: session, status} = useSession();

  function returnHomeBase(){
    useDispatch('api',{action:'homebase'});
  }

  function dispatch(name){
    useDispatch('api',{detail:{view:name}});
  }

  function renderActionMenu(){
    return (<>
      <div  className={styles.dropdowncontent} style={{position:'relative',bottom:'118px', height:'100px',width:'100px',backgroundColor:'gray'}}>

      </div>
    </>)
  }
//{renderActionMenu()}
// ,float:'left'

  return (<>
    <div className={styles.footermenu}>
      <center>
        <div style={{position:'relative' ,height:'32px',backgroundColor:'gray'}}>
          <div style={{position:'relative' ,height:'32px', width:'300px',backgroundColor:'gray',float:'left'}}>
            <button onClick={()=>dispatch('map')}> Map </button>
            <button onClick={()=>dispatch('battle')}> Battle </button>
            <button onClick={()=>dispatch('homebase')}> Home Base </button>
            <button onClick={()=>dispatch('inventory')}> Inventory </button>
            <button> Units </button>
          </div>
          
          <div className={styles.dropdown} style={{position:'relative',width:'64px',height:'32px',backgroundColor:'gray',float:'left'}}>
            <a href="#" > Actions </a>
            {renderActionMenu()}
          </div>
          <div style={{position:'relative' ,height:'32px', width:'300px',backgroundColor:'gray',float:'left'}}>
            <button> Options </button>
            <button> GM </button>
          </div>
        </div>
      </center>
    </div>
  </>);
}