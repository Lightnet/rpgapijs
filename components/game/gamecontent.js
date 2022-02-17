/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Main Game Area entry point

*/

import { useEffect, useState } from 'react';
import Link from 'next/link';

import GameWorld from "./gameworld";
import useFetch from '../hook/usefetch';
import CreateNewGame from './entity/createnewgame';
import ThemeLink from '../theme/themelink';

export default function GameContent() {

  const [ homeBaseExist, setHomeBaseExist ] = useState(false);
  //check new game for new player
  const [ isCheck, setIsCheck ] = useState(false);
  
  useEffect(async()=>{
    const data = await useFetch('api/homebase');
    console.log("data: ",data)
    if(data.error){
      console.log('Fetch Error GET Homebase');
      return;
    }
    if(data.action == "NOTFOUND"){
      setHomeBaseExist(false)
    }
    if(data.action == "HOMEBASE"){
      if(data.homebase){
        setHomeBaseExist(true)
      }else{
        setHomeBaseExist(false)
      }
    }
    setIsCheck(true);
  },[])

  function checkCreateExist(e){
    //console.log("CHECKING>>>...");
    setHomeBaseExist(true)
  }

  function CheckHomeBase(){
    if(isCheck==false){
      return <label>Progress...</label>
    }else{
      if(homeBaseExist){
        return <GameWorld />
      }else{
        return <CreateNewGame CreatedExist={checkCreateExist}/>
      }
    }
  }
  
  return (<>
    <div>
      <Link href='/'>Home</Link>
      <span> | </span>
      <Link href="auth/signout">Sign Out</Link> <span> | </span>
      <ThemeLink/>
    </div>
    {CheckHomeBase()}
  </>)
}