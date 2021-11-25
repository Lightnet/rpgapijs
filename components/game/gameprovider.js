/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { createContext, useContext, useMemo, useState } from "react";

export const GameContext = createContext();

export function useGame(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(`useGame must be used within a UserContext`)
  }
  //const {user, setUser} = context;
  //return {user, setUser};
  return context;
}

export function useInventory(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(`useInventory must be used within a UserContext`)
  }
  const {inventory, setInventory} = context;
  return [inventory, setInventory];
  //return context;
}

export function GameProvider(props){
  const [user, setUser] = useState('');
  const [zoneID, setZoneID] = useState('');
  const [mapID, setMapID] = useState('');

  const [homeBaseID, setHomeBaseID] = useState(null);

  const [characters, setCharacters] = useState([]);
  const [creatures, setCreatures] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [resource, setResource] = useState([]);

  const value = useMemo(()=>({
    user,setUser,
    homeBaseID, setHomeBaseID,
    zoneID, setZoneID,
    mapID, setMapID,
    characters, setCharacters,
    inventory, setInventory,
    creatures, setCreatures,
    resource, setResource
  }),[
    user,
    homeBaseID,
    zoneID,
    mapID,
    characters,
    inventory,
    creatures,
    resource
  ])

  return <GameContext.Provider value={value} {...props} />
}