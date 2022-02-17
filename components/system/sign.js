/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession, signOut, signIn } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeLink from "../theme/themelink";

export default function Sign() {
  const [signInPath,setSignInPath ] = useState(null)

  const {data: session, status} = useSession();
  //console.log(session);
  const router = useRouter();
  useEffect(()=>{
    if(!signInPath){
      setSignInPath("/auth/signin")
    }

    setSignInPath("/auth/signin?callbackUrl="+window.location)
  },[router,signInPath])

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
  if(!signInPath){
    return (<><Link href="/auth/signin">Sign in</Link> <Link href="/auth/signup">Sign Up</Link></>);
  }
  
  return (<>
    <Link href={signInPath}>Sign in</Link> <Link href="/auth/signup">Sign Up</Link> <ThemeLink/>
  </>);
}
/*
<button onClick={() => signIn()}>Sign in</button> <Link href="/auth/signup">Sign Up</Link>
*/