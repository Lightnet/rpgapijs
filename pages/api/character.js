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
  console.log(session);
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
    console.log(characters)
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
/*
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


*/