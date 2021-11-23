/*
  LICENSE: MIT
  Created by: Lightnet
*/


//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../db';
//import { v4 as uuidv4 } from 'uuid';
import { getSession } from "next-auth/react";
import Creature from "../../lib/game/creature";
import { nanoid32 } from "../../lib/helper";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== CHARACTER ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Character = db.model('Character');

  if(req.method == 'GET'){
    let characters = await Character.find({userid:userid}).exec();
    console.log("Characters:", characters.length);
    //console.log(characters)
    //check character if exist
    if(characters.length == 0){
      return res.json({action:"NOTFOUND"});
    }

    if(characters.length >= 1){
      let {action } = req.query;
      if(action !=null){
        if(action == "characterdata"){
          console.log("FOUND CHAR DATA ACTION");
          return res.json({action:"FOUND",data:JSON.parse(characters[0].data)});
        }
      }else{
        return res.json({action:"FOUND"});
      }
    }
  }

  if(req.method == 'POST'){
    let Characters = await Character.find({userid:userid}).exec();
    //prevent adding more character need to chenage it later...
    if(Characters.length== 0){
      let chardata = req.body;
      let characterid = nanoid32();
      //create data
      let playercharacter = new Creature({
        id:characterid
        , name: chardata.name
        , gender: chardata.gender
        , jobs: chardata.jobs
        , races: chardata.races
        , attackpoint: 5
      });

      let newcharacter = new Character({
        id: characterid
        , userid: userid
        , name:chardata.name
        , data: JSON.stringify(playercharacter)
      });

      try{
        let saveCharacter = await newcharacter.save();
        return res.json({action:"CREATED",character:saveCharacter});
      }catch(e){
        return res.json({error:"FAIL"});
      }
    }
  }

  //res.end();
  return res.json({error:"NOTFOUND"});
};