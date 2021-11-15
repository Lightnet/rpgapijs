/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import GameMasterMap from "./gamemastermap";

export default function MapSection() {

  const {data: session, status} = useSession();




  return (<>
    <GameMasterMap></GameMasterMap>
    <div>Map...</div>
  </>);
}
