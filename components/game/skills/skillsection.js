/*
/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from '../../hook/usefetch';

export default function Component() {
  //const {data: session, status} = useSession();
  const [view, setView] = useState("skills");

  useEffect(()=>{
    getSkills();
  });

  async function getSkills(){
    let data = await useFetch('api/skill');
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH SKILLS');
      return;
    }
  }

  return (<>
    <div>
      <label>Skills</label>
    </div>
  </>);
}
