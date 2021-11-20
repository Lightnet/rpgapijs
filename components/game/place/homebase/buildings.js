/*
  LICENSE: MIT
  Created by: Lightnet
*/


import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function Buildings() {

  useEffect(() => {
    getHomeBaseObjects();
    return () => {
    }
  }, [])
  
  async function getHomeBaseObjects(){

  }


  return (<>
    <div>
      <label>Buildings</label>
    </div>
  </>);
}
