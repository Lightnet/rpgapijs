/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

import Creature from "../../lib/game/creature";


export default function Component() {
  const {data: session, status} = useSession();


  var ctest = new Creature();
  console.log(ctest);
  
  useEffect(()=>{
    console.log("status:",status);
  },[status]);

  if (status === "authenticated") {
    return (<>
    <div>
      <button>Map</button>
      <button>Explore</button>

      <button>Battle</button>


      <button>Character</button>
      <button>Skills</button>
      <button>Inventory</button>
      <button>Storage</button>
      <button>HomeBase</button>
      <button>Outpost</button>

      </div>
    </>);
  }
  return (<>
    <div>Loading...</div>
  </>);
}
/*




*/