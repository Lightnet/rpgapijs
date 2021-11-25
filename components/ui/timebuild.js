/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { unixTime } from "../../lib/helper";

export default function TimeBuild({timedate}) {

  const [time, setTime] = useState(0)
  const [timer, setTimer] = useState(null)

  useEffect(()=>{
    if(timedate !=null){
      timer = setInterval(() => {
        //console.log("hello?");
        let currenttime = unixTime();
        //console.log(currenttime, " >> ", timedate)
        let ctime = timedate - currenttime;
        let minutes = Math.floor((ctime % 3600)/60);
        let seconds = ctime % 60;
        var hours = Math.floor(ctime / 3600);
        //console.log(remaintime );
        if(ctime<=0){
          setTime('0:0:0')
        }else{
          setTime(hours+":"+minutes+":"+seconds)
        }
        //console.log(currenttime)
        if(ctime<=0){
          stopTimer();
        }
        
      }, 1000)
    }

    setTimer(timer)
    return ()=>{
      console.log('CLEAN TIMER..')
      clearInterval(timer);
    }
  },[timedate])

  function stopTimer(){
    console.log('stop')
    clearInterval(timer);
  }

  return(
    <label> {time} </label>
  );
}