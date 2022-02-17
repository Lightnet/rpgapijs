/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty, nanoid32 } from "../../lib/helper";
import Creature from "../../lib/game/creature";

export default async (req, res) => {
  console.log("[[[=== HOMEBASE ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });
  //console.log(session);
  //const prisma = clientDB(PrismaClient);
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const HomeBase = db.model('HomeBase');

  if(req.method == 'GET'){
    try{
      let homebase = await HomeBase.find({userid:userid,ismain:true}).exec();
      if(homebase.length == 0){
        homebase=null;
      }
      return res.json({action:"HOMEBASE",homebase:homebase});
    }catch(e){
      return res.json({error:"HOMEBASE"});
    }
  }

  if(req.method == 'POST'){

    let homebase = await HomeBase.find({userid:userid,ismain:true}).exec();
    if(homebase.length == 0){
      homebase=null;
    }
    // if home base exist return error.
    if(homebase){
      return res.json({error:"Exist"});
    }

    // first time create base need checks later...
    let {baseName, characterName, gender, race} = req.body;
    if(isEmpty(baseName)||isEmpty(characterName)){
      console.log("Empty")
      return res.json({error:"Empty"});
    }
    console.log(req.body);
    console.log(baseName);
    console.log(characterName);
    console.log(gender);
    console.log(race);

    let characterid = nanoid32();

    let playercharacter = new Creature({
      id:characterid
      , name: characterName
      , gender: gender
      , jobs: "Special Agent"
      , races: race
      , attackpoint: 5
    });

    const Character = db.model('Character');

    let newcharacter = new Character({
      id: playercharacter.id
      , userid: userid
      , name:characterName
      , data: JSON.stringify(playercharacter)
    });

    let saveCharacter = await newcharacter.save();
    console.log(saveCharacter);

    let newHomeBase = new HomeBase({
      userid:userid,
      name:baseName,
      ismain:true
    });

    let saveHomeBase = await newHomeBase.save();

    return res.json({action:"HOMEBASE",homebase:saveHomeBase});
    
    //return res.json({action:"HOMEBASE",homebase:[]});
  }

  if(req.method == 'PATCH'){
    let data = req.body;
    let query={
      userid:userid,
      ismain:true
    }
    let update={
      name:data.name
    }

    let doc = await HomeBase.findOneAndUpdate(query,update,{
      new: true
    })
    return res.json({action:"UPDATE"});
  }

  if(req.method == 'DELETE'){
    
  }

  //res.end();
  return res.json({error:"NOTFOUND"});
};