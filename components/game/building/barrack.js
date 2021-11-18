/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function Component() {
  //const {data: session, status} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [timeBuilding, setTimeBuilding] = useState(0);
  const [levelBuilding, setLevelBuilding] = useState(0);

  return (<>
    <div>Barrack</div>
  </>);
}