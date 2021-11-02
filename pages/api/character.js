/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';

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
      console.log("NOTFOUND")
      return res.json({message:"UAWENOTFOUND"});
    }
    if(users.length == 1){
      //console.log("FOUND")
      //return res.json({message:"FOUND"});
    }
    console.log(req.body);
    var chardata = JSON.parse(req.body);
    console.log(chardata.name);

    const characters0 = await prisma.character.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });

    if(characters0.length==1){
      console.log("FOUND")
      return res.json({message:"FOUND"});
    }

    const saveUser = await prisma.character.create({
      data:{
        userid:users[0].id,
        name:chardata.name

      }
    })
    
    /*
    return res.json({
      id:saveUser.id
      , name:saveUser.alias
      , role:"member"
    });
    */


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
      console.log("FOUND")
      return res.json({message:"FOUND"});
    }
  }
  res.end();
};