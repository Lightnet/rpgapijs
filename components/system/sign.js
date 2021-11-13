/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession, signOut, signIn } from "next-auth/react";
import Link from 'next/link';

export default function Sign() {
  const {data: session, status} = useSession();
  //console.log(session);

  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  if (session) {
    return (<>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  
  return (<>
    <button onClick={() => signIn()}>Sign in</button>
    <Link href="/auth/signup">Sign Up</Link>
  </>);
}