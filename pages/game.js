/*
# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)
# Created By: Lightnet
*/

//import { getSession, useSession } from "next-auth/react";
//import SocketIOClient from "socket.io-client";
//import SignArea from "../components/system/signarea";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Sign from "../components/system/sign";
import Link from 'next/link';

import GameWorld from "../components/game/gameworld";
import CharacterCreation from "../components/game/entity/character/charactercreation";
import AuthAccess from '../components/system/authaccess';
import useFetch from '../components/hook/usefetch';

export default function Game() {
  const { data: session, status } = useSession();
  const [ characterExist, setCharacterExist ] = useState(false);
  //check character loading exist
  const [ isLoading, setIsLoading ] = useState(true);

  //useEffect(()=>{
    //console.log("status:",status);
  //},[status])

  //mount once
  useEffect(async()=>{
    const data = await useFetch('api/character');
    console.log("data: ",data)
    if(data.error){
      console.log('Fetch Error GET Character');
      return;
    }
    if(data.action == "NOTFOUND"){
      setCharacterExist(false);
      setIsLoading(false)
    }
    if(data.action == "FOUND"){
      setCharacterExist(true);
      setIsLoading(false)
    }
  },[])

  function checkCharacterExist(e){
    //console.log("CHECKING>>>...");
    //console.log(e)
    setCharacterExist(e)
  }

  //make sure the character exist is finish get data checks
  function CharacterLoading(){
    if(isLoading){
      return <label>Loading...</label>
    }else{
      return <CharacterCreation CreatedExist={checkCharacterExist} />
    }
  }

  return (<>
    <AuthAccess>
      <Link href='/'>Home</Link> <Sign></Sign>
      <label> Signed in as {session?.user?.name} </label>
      { characterExist ? <GameWorld /> : (
        CharacterLoading()
      )}
    </AuthAccess>
  </>)
}