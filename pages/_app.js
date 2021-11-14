/*
  LICENSE: MIT
  Created by: Lightnet

  Note: this override the _app.js set up
*/

import React, { useState, useEffect } from "react";
import { SessionProvider } from 'next-auth/react';
import { useRouter } from "next/router";
import Loading from "../components/system/loading";
//import getConfig from 'next/config';
import "../styles/global.css";
//import './styles.css';

// Only holds serverRuntimeConfig and publicRuntimeConfig
//const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
//console.log(serverRuntimeConfig);
//console.log(publicRuntimeConfig);

export default function App({Component, pageProps}){
  //console.log("[[[=== _app.js ===]]]");
  const router = useRouter();
  const [loading, setLoading] = useState(false);//default 

  useEffect(() => {
    //console.log("APP INIT USEDEFFECT!");
    const handleStart = (url) => {
      //check other url "/" or "/game"
      url !== router.pathname ? setLoading(true) : setLoading(false);
      //setLoading(true);
      //console.log("loading:",loading);
    };
    const handleComplete = (url) =>{ 
      //console.log("FINISH LOADING...",loading);
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [loading,router]);

  //render variable changes
  //useEffect(() => {
    //console.log("isLoading: ",loading)
  //});

  function isRenderLoading(){
    if(loading){
      //console.log("render loading:",loading);
      //return (<div>Loading...</div>);
      return <Loading></Loading>;
    }
    return (<></>);
  }
  
  return (    
    <SessionProvider 
      session={pageProps.session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      >
        {isRenderLoading()}
        <Component {...pageProps} />
    </SessionProvider>
  );
}