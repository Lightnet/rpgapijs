/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update

import { getCsrfToken, getSession } from "next-auth/react";
//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../../../lib/db';
import Creature from "../../../lib/game/creature";
import { nanoid16 } from "../../../lib/helper";

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
    let characters = await Character.find({userid:userid}).exec();
    let battleFields = await BattleField.find({userid:userid}).exec();

    if(battleFields.length==0){
      return res.json({message:"NOTFOUND"});
    }

    if(battleFields.length==1){
      let battleData = JSON.parse(battleFields[0].data);
      battleid = battleFields[0].battleid;
      
      //set up entity for attacking each other
      let player = battleData.ally[0];
      let opponent = battleData.foe[0];

      //base attack
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

      //reassign
      battleData.ally[0]=player;
      battleData.foe[0]=opponent;
      console.log(battleData);
      let data=[];
      data= JSON.stringify(battleData);
      try{
        let battleFieldUpate = await BattleField.findOneAndUpdate({battleid: battleid},{data:data}, {
          new: true
        });
        console.log(battleFieldUpate);
        return res.json({message:"UPDATE",battlefield:battleData});
      }catch(e){
        console.log("FAIL UPDATE BATTLE!");
      }
    }
  }
  //finish server api
  //res.end();
  return res.json({message:"NOTFOUND"});
}