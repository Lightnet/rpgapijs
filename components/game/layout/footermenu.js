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


  return (<>
    <div className={styles.footermenu}>
      <center>
        <button> Map </button>
        <button> Battle </button>
        <button onClick={returnHomeBase}> Home Base </button>
        <button> Units </button>
        <button> Actions </button>
        <button> Options </button>
        <button> GM </button>
      </center>
    </div>
  </>);
}