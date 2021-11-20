/*
  LICENSE: MIT
  Created by: Lightnet
*/


import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useFetch from "../../../hook/usefetch"

export default function Component() {
  const {data: session, status} = useSession();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ characterData, setCharacterData ] = useState(null);

  //once check
  useEffect(async()=>{
    checkCharacterData()
  },[])

  //watch var changes
  useEffect(()=>{
    console.log("status:",status);

  },[status])

  async function checkCharacterData(){
    console.log("checking....");
    const data = await useFetch('api/character?action=characterdata',{
      method:'GET'
    });
    console.log("data: ",data)
    if(data.error){
      console.log('Fetch Error GET Character')
      return;
    }
    
    if(data.action == "NOTFOUND"){
      //setCharacterExist(true);
    }
    if(data.action == "FOUND"){
      //setCharacterExist(true);
      console.log(data);
      setCharacterData(data.data);
    }
  }
  return (<>
    {characterData ? (
    <div>
      Character...
      <table>
        <tbody>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <label>{characterData.name}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Race:</label>
            </td>
            <td>
              <label>{characterData.races[0]}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Gender:</label>
            </td>
            <td>
              <label>{characterData.gender}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Job:</label>
            </td>
            <td>
              <label>{characterData.jobs[0]}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Level:</label>
            </td>
            <td>
              <label>{characterData.level}</label>
            </td>
          </tr>


          <tr>
            <td>
              <label>Experience:</label>
            </td>
            <td>
              <label>{characterData.experience}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Experience Next:</label>
            </td>
            <td>
              <label>{characterData.experiencenext}</label>
            </td>
          </tr>




          <tr>
            <td>
              <label>Health:</label>
            </td>
            <td>
              <label>{characterData.healthpoint}/{characterData.healthpointmax}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Magic:</label>
            </td>
            <td>
              <label>{characterData.magicpoint}/{characterData.magicpointmax}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Attack:</label>
            </td>
            <td>
              <label>{characterData.attackpoint}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Defence:</label>
            </td>
            <td>
              <label>{characterData.defencepoint}</label>
            </td>
          </tr>


          <tr>
            <td>
              <label>Magic Attack:</label>
            </td>
            <td>
              <label>{characterData.magicattackpoint}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Magic Defence:</label>
            </td>
            <td>
              <label>{characterData.magicdefencepoint}</label>
            </td>
          </tr>


        </tbody>
      </table>

    </div>
    ):(<div>None</div>)}
  </>);
}
