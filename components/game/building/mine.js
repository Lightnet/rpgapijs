/*
  LICENSE: MIT
  Created by: Lightnet
*/


import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function Component() {
  const {data: session, status} = useSession();
  const [_type, set_Type] = useState("Ore");


  return (<>
    <div>Mine?</div>
  </>);
}