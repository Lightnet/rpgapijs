/*

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Created By: Lightnet

*/

import { useEffect, useState } from 'react';
//import { getSession, useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
//import SocketIOClient from "socket.io-client";
import SignArea from "../components/system/signarea";
import Sign from "../components/system/btnsign";
import Link from 'next/link';

import GameWorld from "../components/game/gameworld";
import CharacterCreation from "../components/game/entity/charactercreation";

//import Creature from "../lib/game/creature";

export default function Page() {
  const { data: session, status } = useSession();
  const [characterExist, setCharacterExist ] = useState(false);


  //var ctest = new Creature();
  //console.log(ctest);
  //var cjson = JSON.stringify(ctest);
  //console.log(cjson);

  useEffect(()=>{
    console.log("status:",status);

  },[status])

  useEffect(async()=>{
    const response = await fetch('api/character');
    const data = await response.json();
    console.log("data: ",data)
    if(data.message == "NOTFOUND"){
      setCharacterExist(false);
    }
    if(data.message == "FOUND"){
      setCharacterExist(true);
    }
  },[])

  async function checkCharacterExist(){
    console.log("checking....");
    const response = await fetch('api/character');
    const data = await response.json();
    console.log("data: ",data)
    if(data.message == "NOTFOUND"){
      setCharacterExist(true);
    }
    if(data.message == "FOUND"){
      setCharacterExist(true);
    }
  }

  function checkCharacterExist(e){
    console.log("CHECKING>>>...");
    console.log(e)
    setCharacterExist(e)
  }

  // session check while loading
  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  if (status === "authenticated") {
    return(<>
      <Link href='/'>Home</Link>
      <Sign></Sign>
      <label>Signed in as {session.user.name}</label>
      { characterExist ? <GameWorld /> : (
      <>
      <button onClick={checkCharacterExist}>checkCharacterExist</button>
        <CharacterCreation
        CreatedExist={checkCharacterExist}
         />
      </>
      )}

    </>)
  }

  return (<>
    <SignArea></SignArea>
  </>)
}

/*
<button onClick={checkCharacterExist}>checkCharacterExist<button>

*/