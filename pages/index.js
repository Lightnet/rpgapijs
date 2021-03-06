/*

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Created By: Lightnet

*/

// https://www.pluralsight.com/guides/understanding-links-in-reactjs

//import { useEffect, useState } from 'react';

//import SocketIOClient from "socket.io-client";
import { useSession } from "next-auth/react";
import Sign from "../components/system/sign";
import Link from 'next/link';
import AuthAccess from "../components/system/authaccess";
import ThemeLink from "../components/theme/themelink";

export default function Page() {
  const { data: session } = useSession()

  //check var change status.
  //useEffect(async () => {
    //console.log("status:",status);
  //},[status]);

  // index page
  return (<>
    <AuthAccess>
      <Sign></Sign>
      <label> Signed in as {session?.user.name} </label> <span> | </span> <ThemeLink/>
      <br />
      <Link href='/game'>Game</Link>
      
    </AuthAccess>
  </>)
}
// <NotiftyTestv2 />