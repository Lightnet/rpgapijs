/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { createContext, useMemo, useState } from "react";

export const GameContext = createContext();

export function useGame(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(`useForum must be used within a UserContext`)
  }
  //const {user, setUser} = context;
  //return {user, setUser};
  return context;
}

export function GameProvider(props){
  const [user, setUser] = useState('');
  const [zoneID, setZoneID] = useState('');
  const [mapID, setMapID] = useState('');

  const [characters, setCharacters] = useState([]);
  const [creatures, setCreatures] = useState([]);
  const [inventory, setInventory] = useState([]);

  const value = useMemo(()=>({
    user,setUser,
    zoneID, setZoneID,
    mapID, setMapID,
    characters, setCharacters,
    inventory, setInventory,
    creatures, setCreatures
  }),[
    user,
    zoneID,
    mapID,
    characters,
    inventory,
    creatures
  ])

  return <GameContext.Provider value={value} {...props} />
}