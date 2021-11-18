/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from '../../hook/usefetch';

export default function MapSection() {

  //const {data: session, status} = useSession();

  useEffect(()=>{
    //getMap()
  });

  async function getMap(){
    let data = await useFetch('api/map');
  }

  return (<>
    <div>Map...</div>
  </>);
}
