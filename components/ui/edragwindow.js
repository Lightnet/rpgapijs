/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable

import { useRef, useEffect, useState } from 'react';

import styles from "./draggable.module.css";

export default function Component({props,position,title,children}) {
  const ref = useRef();
  //console.log("ref");
  //console.log(ref);
  console.log("props");
  console.log(props);
  console.log(this);
  console.log(ref);
  //console.log(ref.title);
  console.log(position);
  if(!position){
    position=[0,0]
  }


  const [relX, setrelX] = useState(0)
  const [relY, setrelY] = useState(0)

  const [posX, setPosX] = useState(10)
  const [posY, setPosY] = useState(0)

  const [isPress, setIsPress] = useState(false)

  //if(!props){
    //props={};
  //}
  //if(!props.title){
    //props.title="window";
  //}
  //console.log("children")
  //console.log(children);

  
  useEffect(async () => {
    
  }, []);
  
  
  function dragMouseDown(e) {
    if(!isPress){
      e = e || window.event;
      e.preventDefault();
      const {scrollLeft, scrollTop, clientLeft, clientTop} = document.body;
      const {left, top} = ref.current.getBoundingClientRect();
      setrelX(e.pageX - (left + scrollLeft - clientLeft));
      setrelY(e.pageY - (top + scrollTop - clientTop));
      setIsPress(true);
    }
    return false;
  }
  
  function OnMouseMove(e) {
    if (isPress) {
      //console.log("move?");
      e = e || window.event;
      e.preventDefault();
      setPosX(e.pageX - relX);
      setPosY(e.pageY - relY);
    }
  }

  function OnMouseUp() {
    // stop moving when mouse button is released:
    setIsPress(false);
  }
  
  return (<>
    <div ref={ref} className={styles.dwindow} style={{left:posX+'px',top:posY+'px'}}>
      <div className={styles.header} 
        onMouseDown={dragMouseDown}
        onMouseMove={OnMouseMove}
        onMouseUp={OnMouseUp}
        >{title}</div>

        {children}

    </div>
  </>)
}
/*
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>

*/