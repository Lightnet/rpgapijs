/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getSession } from "next-auth/react";
import { nanoid16 } from "../../lib/helper";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== ZONE ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Zone = db.model('Zone');

  if(req.method == 'GET'){
    let zones = await Zone.find().exec();
    return res.json({action:"ZONES",zones:zones});
  } 

  if(req.method == 'POST'){
    let data = req.body;
    console.log(data);
    
    if(data.action){
      if(data.action='CREATE'){
        console.log(data);
        let newZone = new Zone({
          userid:userid
          , name:nanoid16()
        });
        let saveZone = await newZone.save();
        return res.json({action:"CREATE",zone:saveZone});
      }
    }
  }

  if(req.method == 'DELETE'){
    let data =  req.body;

    let deleteZone = await Zone.findOneAndDelete({id:data.id}).exec();
    console.log("deleteZone",deleteZone)

    return res.json({action:"DELETE",id:data.id});
  }
  
  //res.end();
  return res.json({error:"NOTFOUND"});
};