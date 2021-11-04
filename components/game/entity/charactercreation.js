
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

import {getSelectSpecies, getSelectJobs} from "../../../lib/game/creature";

import { makeId } from "../../../lib/helper";

export default function Component({CreatedExist}) {
  const {data: session, status} = useSession();
  const _races = getSelectSpecies();
  const _jobs = getSelectJobs();

  const [name, setName] = useState("");

  const [races, setRaces] = useState(["human"]);
  const [jobs, setJobs] = useState(["warrior"]);
  const [gender, setGender] = useState("male");

  const [isCreated, setIsCreated] = useState(false);


  useEffect(()=>{
    console.log("status:",status);
  },[status]);

  function CheckName(){

  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  async function CreateCharacter(){
    const response = await fetch('api/character',{
      method:'POST',
      body:JSON.stringify({
        name:name,
        gender:gender,
        races:races,
        jobs:jobs,
        attackpoint:5
       })
    });
    const data = await response.json();
    console.log("data: ",data)
    if(data.message == "CREATED"){
      setIsCreated(true);
      CreatedExist(true);
    }
  }

  function btnRandomName(){
    setName(makeId(16));
  }

  function TypeCharacterName(event){
    setName(event.target.value);
  }

  function selectRace(event){
    console.log("select",event.target.value);
    setRaces([event.target.value])
  }

  function selectGender(event){
    console.log("select",event.target.value);
    setGender(event.target.value)
  }

  function selectJobs(event){
    console.log("select",event.target.value);
    setJobs([event.target.value])
  }

  if(isCreated){
    return (<>
      <label>Create</label>
    </>);
  }

  if (status === "authenticated") {
    return (<>
    <div>
      <table>
        <tbody>
        <tr>
          <td>
            <label>Name:</label>
          </td>
          <td>
            <input value={name} onChange={TypeCharacterName}></input> <button onClick={btnRandomName}> Random Name </button>
          </td>
        </tr>
        <tr>
          <td>
            <label>Race:</label>
          </td>
          <td>
            <select onChange={selectRace} >
            {_races.map((item)=>{
              return <option key={item.name} value={item.name}>{item.name}</option>
            })}
            
            </select >
          </td>
        </tr>
        <tr>
          <td>
            <label>Gender:</label>
          </td>
          <td>
          <select onChange={selectGender} >
          <option value="male">Male </option>
          <option value="female"> Female </option>
          </select>

          </td>
        </tr>
        <tr>
          <td>
            <label>Jobs:</label>
          </td>
          <td>
          <select onChange={selectJobs} >
            {_jobs.map((item)=>{
              return <option key={item.name} value={item.name}>{item.name}</option>
            })}
            
            </select >
          </td>
        </tr>
        </tbody>
      </table>
      
      <button onClick={CreateCharacter}> Create </button>
      </div>
    </>);
  }
  return (<>
    <div>Loading...</div>
  </>);
}