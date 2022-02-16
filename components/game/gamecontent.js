import { useEffect, useState } from 'react';
import Link from 'next/link';

import GameWorld from "./gameworld";
import CharacterCreation from "./entity/character/charactercreation";
import useFetch from '../hook/usefetch';
import ThemeSection from '../system/themesection';

export default function GameContent() {
  const [ characterExist, setCharacterExist ] = useState(false);
  //check character loading exist
  const [ isLoading, setIsLoading ] = useState(true);

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
      <Link href='/'>Home</Link>
      <span> | </span>
      <Link href="auth/signout">Sign Out</Link> <span> | </span>
      <ThemeSection></ThemeSection>

      { characterExist ? <GameWorld /> : (
        CharacterLoading()
      )}
  </>)
}