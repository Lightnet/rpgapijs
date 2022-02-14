/*
  LICENSE: MIT
  Created by: Lightnet

  very simple useDispatch using the doc or window to listen to handle name

*/

//import { useEffect, useRef } from "react";

export default function useDispatch(event,data) {
  window.dispatchEvent(new CustomEvent(event,data));
}