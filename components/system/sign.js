/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession, signOut, signIn } from "next-auth/react";

export default function Sign() {
  const {data: session, loading} = useSession();
  //console.log(session);
  if (session) {
    return (<>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  return (<>
    <button onClick={() => signIn()}>Sign in</button>
    <a href="/auth/signup">Sign Up</a>
  </>);
}