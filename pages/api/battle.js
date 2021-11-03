/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update

import { getCsrfToken, getSession } from "next-auth/react";
import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';
import Creature from "../../lib/game/creature";

import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  console.log("[[[=== BATTLE ===]]]");
  const session = await getSession({ req })
  const prisma = clientDB(PrismaClient);

  console.log("req.method: ",req.method);
  // need check for user login to prevent break logic battle
  // need to add token as it just testing fight...

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
      return res.json({message:"UAWENOTFOUND"});
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

      /*
      const updateUser = await prisma.user.update({
        where: {
          email: 'viola@prisma.io',
        },
        data: {
          name: 'Viola the Magnificent',
        },
      })
      */
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
    console.log("USER ACTOPMS...")
  }

  //finish server api
  //res.end();
  return res.json({message:"NOTFOUND"});
}
