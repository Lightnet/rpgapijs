/*
  LICENSE: MIT
  Created by: Lightnet
*/


//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../db';
//import { v4 as uuidv4 } from 'uuid';
import { getCsrfToken, getSession } from "next-auth/react";
//import Creature from "../../lib/game/creature";
//import { nanoid32 } from "../../lib/helper";
import db,{ sessionTokenCheck,testCall } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== INVENTORY ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });
  //console.log(session);
  //const prisma = clientDB(PrismaClient);
  //let userid;
  //let username;
  //console.log(await sessionTokenCheck(session))
  //console.log(await testCall())

  let {error, userid, username} = await sessionTokenCheck(session);
  console.log(error);
  console.log(userid);
  console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  const Inventory = db.model('Inventory');

  //const Character = db.model('Character');
  if(req.method == 'GET'){
    
    let inventorys = await Inventory.find({userid:userid}).exec();
    console.log("inventorys:", inventorys.length);
    //console.log(inventorys)
    //check inventory if exist
    if(inventorys.length == 0){
      return res.json({message:"NOINVENTORY"});
    }

    if(inventorys.length >= 1){
      return res.json({action:"ITEMS",inventory:inventorys});
    }
  }

  if(req.method == 'POST'){
    let data = JSON.parse(req.body);
    if(data.action){
      if(data.action=='CREATE'){
        
        let newInventory = Inventory({
          userid:userid
          , name:'Healing potion'
        });

        let doc = await newInventory.save();

        console.log(doc);

        return res.json({action:"CREATE",item:doc});
      }
    }
  }

  //res.end();
  return res.json({action:"NOTFOUND"});
};