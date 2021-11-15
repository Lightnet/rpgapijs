/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function GameMasterMap() {

  const {data: session, status} = useSession();

  return (<>
    <div>[ GM ] <button>Create</button> </div>
  </>);
}
