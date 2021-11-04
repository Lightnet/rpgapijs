/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getSession } from "next-auth/react";
import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';
import Creature from "../../lib/game/creature";
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  console.log("[[[=== CHARACTER ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req })
  const prisma = clientDB(PrismaClient);

  const users = await prisma.user.findMany({
    where:{
      id:{
        equals:session.user.id
      }
    }
  });

  console.log(session);
  if(req.method == 'POST'){
    if(users.length == 0){//need to fix later....
      console.log("NOTFOUND >>")
      return res.json({message:"USERNOTFOUND"});
    }
    if(users.length == 1){
      console.log("FOUND")
      //return res.json({message:"FOUND"});
    }
    console.log(req.body);
    var chardata = JSON.parse(req.body);
    console.log(chardata.name);
    console.log("1")
    const characters0 = await prisma.character.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });
    console.log("2")
    if(characters0.length==1){
      console.log("FOUND")
      return res.json({message:"FOUND"});
    }
    console.log("3")
    console.log(chardata.races)
    let playercharacter = new Creature({
      id:uuidv4()
      , name: chardata.name
      , gender: chardata.gender
      , jobs: chardata.jobs
      , races: chardata.races
    });

    console.log("playercharacter: ", playercharacter );

    const saveUser = await prisma.character.create({
      data:{
        userid:users[0].id
        , name:chardata.name
        , data: JSON.stringify(playercharacter)

      }
    });
    
    return res.json({
      id:saveUser.id
      , message:"CREATED"
    });
    

    return res.json({message:"TEST"});

  }

  if(req.method == 'GET'){
    //console.log("users: ",users);
    if(users.length == 0){//need to fix later....
      console.log("NOTFOUND")
      return res.json({message:"UAWENOTFOUND"});
    }
    if(users.length == 1){
      //console.log("FOUND")
      //return res.json({message:"FOUND"});
    }
    const characters = await prisma.character.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });
    console.log("characters: ",characters);
    if(characters.length==0){
      console.log("NOTFOUND")
      return res.json({message:"NOTFOUND"});
    }
    if(characters.length==1){
      console.log("FOUND");

      console.log(req.body);
      console.log(req.pathname);
      console.log(req.query);
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
  res.end();
};