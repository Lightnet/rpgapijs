/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';
import { isEmpty, nanoid16 } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';

export default function CreateNewGame({CreatedExist}) {

  const [characterName, setCharacterName] = useState("");
  const [baseName, setBaseName] = useState("");
  const [gender, setGender] = useState("male");
  const [race, setRace] = useState("human");

  const [isCreated, setIsCreated] = useState(false);

  const typeCharacterName = e => setCharacterName(e.target.value);
  const typeBaseName = e => setBaseName(e.target.value);
  const typeGender = e => setGender(e.target.value);
  const selectRace = e => setRace(e.target.value);

  useEffect(()=>{
    setCharacterName("char"+nanoid16())
    setBaseName("base"+nanoid16())
  },[])

  async function createHomeBase(){
    if(isEmpty(characterName) || isEmpty(baseName)){
      console.log("Empty Fields")
      return;
    }
    console.log("checking...");

    const data = await useFetch('api/homebase',{
      method:"POST"
      , body:JSON.stringify({
        baseName:baseName
        , characterName:characterName
        , gender:gender
        , race:race
      })
    });
    if(data.error){
      console.log('Fetch Error GET Homebase');
      return;
    }
    console.log("data: ",data)
    if(data.action=="HOMEBASE"){
      if(data.homebase?.name){
        console.log("CREATE")
        CreatedExist(true);
      }else{
        console.log("BASE CREATE ERROR???")
      }
    }
  }

  if(isCreated==false){
    return(<>
      <div>
        <table>
          <tbody>
          <tr>
            <td>
              <label>Character Name:</label>
            </td>
            <td>
              <input value={characterName} onChange={typeCharacterName}></input>
            </td>
          </tr>
          <tr>
            <td>
              <label>Race:</label>
            </td>
            <td>
              <select onChange={selectRace} >
              {
              //_races.map((item)=>{
                //return <option key={item.name} value={item.name}>{item.name}</option>
              //})
              }
              </select >
            </td>
          </tr>
          <tr>
            <td>
              <label>Gender:</label>
            </td>
            <td>
              <select value={gender} onChange={typeGender} >
                <option value="male">Male </option>
                <option value="female"> Female </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Home Base Name:</label>
            </td>
            <td>
              <input value={baseName} onChange={typeBaseName}/>
            </td>
          </tr>
          </tbody>
        </table>
        
        <button onClick={createHomeBase}> Create </button>
      </div>
    </>)
  }

  return (<>
    <div>Loading...</div>
  </>);
}