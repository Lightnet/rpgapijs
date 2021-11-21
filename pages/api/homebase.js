/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";

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
    let data = req.body;
    let newHomeBase = new HomeBase({
      userid:userid,
      name:data.name
    });
    let saveHomeBase = await newHomeBase.save();
    return res.json({action:"HOMEBASE",homebase:saveHomeBase});
  }

  if(req.method == 'PATCH'){
    
  }

  if(req.method == 'DELETE'){
    
  }

  //res.end();
  return res.json({error:"NOTFOUND"});
};