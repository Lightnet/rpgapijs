/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update

import { getCsrfToken, getSession } from "next-auth/react";
//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../../../lib/db';
import Creature from "../../../lib/game/creature";
import { nanoid16 } from "../../../lib/genid";

import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  console.log("[[[=== BATTLE TURN BASE ===]]]");
  const session = await getSession({ req })
  //const prisma = clientDB(PrismaClient);

  console.log("req.method: ",req.method);
  // need check for user login to prevent break logic battle
  // need to add token as it just testing fight...
  let userid;
  let username;
  let battleid;

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
            battleid = user.battleid;
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
  const BattleField = db.model('BattleField');

  if(req.method == 'GET'){
    let characters = await Character.find({userid:userid}).exec();
    let BattleFields = await BattleField.find({userid:userid}).exec();
    console.log("characters");
    console.log(characters);
    console.log("BattleFields");
    console.log(BattleFields);
    if(BattleFields.length==0){
      console.log("NO BATTLE ID...");

      //battleid = uuidv4();
      battleid = nanoid16();

      let new_creature = new Creature({
        id:uuidv4(),
        name:"rabit",
        races:['beast'],
        healthpoint:10,
        healthpointmax:10,
        experience:5
      });

      let player = JSON.parse(characters[0].data);
      let newBattleData = {};
      newBattleData.turns =0;//number battle turns
      newBattleData.allyturns =0;//count many unit finish
      newBattleData.foeturns =0;
      newBattleData.ally=[];
      newBattleData.foe=[];
      newBattleData.ally.push(player);
      newBattleData.foe.push(new_creature);

      let newBattleField = new BattleField({
        userid: userid
        , battleid:battleid
        , data: JSON.stringify(newBattleData)
      });

      try{
        let saveBattleField = await newBattleField.save();

        const User = db.model('User');
        await User.findOneAndUpdate({id: userid},{battleid:battleid}, {
          new: true
        });

        return res.json({message:"CREATED"});
      }catch(e){
        return res.json({message:"FAIL"});
      }
    }
    if(BattleFields.length==1){

      return res.json({message:"FOUND",battlefield:JSON.parse(BattleFields[0].data)});
    }
  }

  if(req.method == 'POST'){

  }


  //finish server api
  //res.end();
  return res.json({message:"NOTFOUND"});
}
/*
  const users = await prisma.user.findMany({
    where:{
      id:{
        equals:session.user.id
      }
    }
  });

  //RANDOM need add checks later
  if(req.method == 'GET'){
    //get map location and chance of random or place in the map field

    if(users.length == 0){//need to fix later....
      console.log("NOTFOUND")
      return res.json({message:"USERNOTFOUND"});
    }

    const characters = await prisma.character.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });

    if(characters.length==0){
      console.log("NOTFOUND")
      return res.json({message:"NOTFOUND"});
    }

    const battles = await prisma.battleField.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });

    console.log("battles: " , battles);
    if(battles.length==0){
      console.log("[BATTLE] NOT FOUND");
      console.log("[BATTLE] Creating....");
      let battleid = uuidv4();

      let new_creature = new Creature({
        id:uuidv4(),
        name:"rabit",
        races:['beast'],
        healthpoint:10,
        healthpointmax:10,
        experience:5
      });
      console.log("new_creature: ", new_creature);

      let player = JSON.parse(characters[0].data)
      console.log("player: ",player)

      let characterlist = [];
      characterlist.push(new_creature)
      characterlist.push(player)

      let data = JSON.stringify(characterlist);

      const saveBattleField = await prisma.battleField.create({
        data:{
          battleid:battleid,
          userid:users[0].id,
          data:data
        }
      })
      
      const updateUser = await prisma.user.update({
        where: {
          id: users[0].id,
        },
        data: {
          battleid: battleid,
        },
      });

      console.log("updateUser: ", updateUser);

      return res.json({
        message:"CREATED"
        , data: data
      });

    }

    if(battles.length==1){
      console.log("FOUND????")

      return res.json({
        message:"FOUND"
        , data:battles[0].data
      });
    }

  }

  //player action command and monster attack
  if(req.method == 'POST'){
    console.log("USER ACTOPMS...");

    console.log("req.body:",req.body);
    let userData = JSON.parse(req.body);
    console.log("userData:", userData);

    const userCharacters = await prisma.character.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });

    console.log("userCharacters:  ",userCharacters);
    let mainCharacter = JSON.parse(userCharacters[0].data);

    const userBattles = await prisma.battleField.findMany({
      where:{
        userid:{
          equals:users[0].id
        }
      }
    });

    //console.log("userBattles: ", userBattles);
    if(userBattles.length == 0){
      console.log("NOTFOUND")
    }

    if(userBattles.length == 1){
      console.log("FOUND")
      let battleData = JSON.parse(userBattles[0].data);
      console.log(battleData);
      let player;
      let opponent;

      if(mainCharacter.id == battleData[0].id){
        player=battleData[0];
        opponent=battleData[1];
      }

      if(mainCharacter.id == battleData[1].id){
        player=battleData[1];
        opponent=battleData[0];
      }

      console.log("player: ",player);
      console.log("opponent: ",opponent);
      let attack = opponent.defencepoint - player.attackpoint;
      if(attack >= 0){
        attack = 0;
      }
      opponent.healthpoint = opponent.healthpoint + attack;

      attack = (player.defencepoint - opponent.attackpoint);
      if(attack >= 0){
        attack=0;
      }
      player.healthpoint = player.healthpoint + attack;

      let data=[];
      data.push(opponent);
      data.push(player);
      console.log(data);
      data= JSON.stringify(data);

      // UPDATE BATTLEFIELD
      const updateUser = await prisma.battleField.update({
        where: {
          id: userBattles[0].id
        },
        data: {
          data: data,
        },
      });
      
      return res.json({
        message:"UPDATE"
        , data:data
      });
    }
  }

*/