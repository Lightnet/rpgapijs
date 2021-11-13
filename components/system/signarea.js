/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useEffect } from 'react';
import { useSession, signOut, signIn } from "next-auth/react"
//import { getSession } from "next-auth/react";


// https://next-auth.js.org/getting-started/client
// useSession()
export default function Component() {
  const { data: session, status } = useSession()
  console.log("[[[=== SIGN AREA ===]]]")
  //console.log("status",status);
  //console.log("session",session);

  if (session) {
    return (<>
    <label>Signed in as: {session.user.name}</label>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  
  return (<>
    <label> Not </label>
    <button onClick={() => signIn()}>Sign in</button>
    <span> | or | </span>
    <a href="/auth/signup">Sign Up</a>
  </>);
}

/*
<button onClick={() => signOut()}>Sign out</button>
*/