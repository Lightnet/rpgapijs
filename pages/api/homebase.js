/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

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
    let data = req.body;
    let newHomeBase = new HomeBase({
      userid:userid,
      name:data.name,
      ismain:true
    });
    let saveHomeBase = await newHomeBase.save();
    return res.json({action:"HOMEBASE",homebase:saveHomeBase});
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