/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getSession } from "next-auth/react";
//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../db';
import Creature from "../../lib/game/creature";
import { v4 as uuidv4 } from 'uuid';
import db from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== CHARACTER ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });
  //console.log(session);
  //const prisma = clientDB(PrismaClient);
  let userid;
  let username;
  if(session){
    if(!session.user.name){
      return res.json({error:"FAIL"});  
    }
    if(!session.user.token){
      return res.json({error:"FAIL"});  
    }

    if(session.user.token){
      const User = db.model('User');
      const user = await User.findOne({username: session.user.name}).exec();
      if(typeof session.user.token == "string"){
        //console.log("STRING DATA...");
        if(user){
          //console.log("FOUND???");
          let bcheck = user.checkToken(session.user.token);
          //console.log("TOKEN: ", bcheck);
          //console.log(user);
          if(bcheck){
            // pass
            userid = user.id;
            username = user.username;
          }else{
            return res.json({error:"FAIL"});
          }
        }else{
          return res.json({error:"FAIL"});
        }
      }
    }
  }else{
    return res.json({error:"FAIL"});
  }

  const Character = db.model('Character');

  if(req.method == 'GET'){
    let characters = await Character.find({userid:userid}).exec();
    console.log("Characters:", characters.length);
    //console.log(characters)
    //check character if exist
    if(characters.length == 0){
      return res.json({message:"NOTFOUND"});
    }

    if(characters.length >= 1){
      let {action } = req.query;
      if(action !=null){
        if(action == "characterdata"){
          console.log("FOUND CHAR DATA ACTION");
          return res.json({message:"FOUND",data:JSON.parse(characters[0].data)});
        }
      }

      return res.json({message:"FOUND"});
    }
  }

  if(req.method == 'POST'){
    let Characters = await Character.find({userid:userid}).exec();
    //prevent adding more character need to chenage it later...
    if(Characters.length== 0){
      let chardata = JSON.parse(req.body);

      //create data
      let playercharacter = new Creature({
        id:uuidv4()
        , name: chardata.name
        , gender: chardata.gender
        , jobs: chardata.jobs
        , races: chardata.races
        , attackpoint: 5
      });

      let newcharacter = new Character({
        userid: userid
        , name:chardata.name
        , data: JSON.stringify(playercharacter)
      });

      try{
        let saveCharacter = await newcharacter.save();
        return res.json({message:"CREATED"});
      }catch(e){
        return res.json({message:"FAIL"});
      }
    }
  }

 
  //res.end();
  return res.json({message:"NOTFOUND"});
};