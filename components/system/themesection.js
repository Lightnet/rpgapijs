/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getSession } from "next-auth/react";
import React, {useState, useEffect} from "react";
import { useTheme } from "../theme/themeprovider";

export default function ThemeSection() {

  const {theme, setTheme} = useTheme();

  function clickTheme(event){
    event.preventDefault();
    //console.log('theme');
    let currentTheme = theme;
    let targetTheme = "light";

    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    setTheme(targetTheme);

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  }
  
  return <a style={{cursor: 'pointer'}} onClick={clickTheme}>Theme {theme}</a>
}