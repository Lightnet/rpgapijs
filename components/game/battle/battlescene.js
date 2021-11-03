/*
  LICENSE: MIT
  Created by: Lightnet

*/
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function Component() {
  //const {data: session, status} = useSession();
  const [isBattle, setIsBattle] = useState(false);


  function randomBattle(){

  }

  function playerAttack(){

  }


  return (<>
    <div>
      {(!isBattle) && <button onClick={randomBattle}>Random Battle</button>}

      {(isBattle) &&(
        <>
          <button onClick={playerAttack}>Random Battle</button>
        
        
        </>
      )}
    </div>
  </>);
}