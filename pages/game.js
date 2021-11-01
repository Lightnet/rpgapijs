/*

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Created By: Lightnet

*/


import { useEffect, useState } from 'react';
//import { getSession, useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
//import SocketIOClient from "socket.io-client";
import SignArea from "../components/system/signarea";
import Sign from "../components/system/btnsign";
import Link from 'next/link';

export default function Page() {
  const { data: session, status } = useSession()
  useEffect(()=>{
    console.log("status:",status);
  },[status])

  if (status === "authenticated") {
    return(<>
      <Link href='/'>Home</Link>
      <Sign></Sign>
      <p>Signed in as {session.user.name}</p>
    </>)
  }

  return (<>
    <SignArea></SignArea>
  </>)
}