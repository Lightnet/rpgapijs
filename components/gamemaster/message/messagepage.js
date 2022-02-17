/*
  LICENSE: MIT
  Created by: Lightnet
*/

import {useNotifty} from "../../notify/notifyprovider";

export default function MessagePage(){
  const {dispatchNotify} = useNotifty();

  function testInfo(){
    dispatchNotify({
      type:'add'
      , children:'hellow'
    })
  }

  return <>
    <button onClick={testInfo}> Hello Info </button>
  </>
}