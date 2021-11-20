/*
  LICENSE: MIT
  Created by: Lightnet
*/

/*
  tick base is time when player have few sec to attack else it calculate monster attack
  one reason is prevent too much idle

*/

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#update

import { getCsrfToken, getSession } from "next-auth/react";
//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../../../lib/db';
import Creature from "../../../lib/game/creature";

import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  console.log("[[[=== BATTLE TICK ===]]]");
  const session = await getSession({ req })
  //const prisma = clientDB(PrismaClient);

  console.log("req.method: ",req.method);
  // need check for user login to prevent break logic battle
  // need to add token as it just testing fight...
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

  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){

  }

  //finish server api
  //res.end();
  return res.json({error:"NOTFOUND"});
}