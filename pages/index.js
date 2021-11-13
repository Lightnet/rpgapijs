/*

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Created By: Lightnet

*/

// https://www.pluralsight.com/guides/understanding-links-in-reactjs

import { useEffect, useState } from 'react';
//import { getSession, useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
//import SocketIOClient from "socket.io-client";
import SignArea from "../components/system/signarea";
import Sign from "../components/system/sign";

//import { Link } from 'react-router-dom';
import Link from 'next/link'

export default function Page() {
  const { data: session, status } = useSession()

  //check var change status.
  useEffect(async () => {
    console.log("status:",status);
  },[status]);

  // session check while loading
  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  //if session finish with auth pass
  if (status === "authenticated") {
    return(<>
      <Sign></Sign>
      <label> Signed in as {session.user.name} </label>
      <br />
      <Link href='/game'>Game</Link>
    </>)
  }

  // index page
  return (<>
    <SignArea></SignArea>
  </>)
}