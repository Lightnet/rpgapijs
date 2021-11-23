/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
//import { nanoid32 } from "../../lib/helper";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== STORAGE ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });

  let {error, userid, username} = await sessionTokenCheck(session);
  console.log(error);
  console.log(userid);
  console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();

  //const Character = db.model('Character');
  if(req.method == 'GET'){
    /*
    let characters = await Character.find({userid:userid}).exec();
    console.log("Characters:", characters.length);
    //console.log(characters)
    //check character if exist
    if(characters.length == 0){
      return res.json({action:"NOTFOUND"});
    }

    if(characters.length >= 1){
      let {action } = req.query;
      if(action !=null){
        if(action == "characterdata"){
          console.log("FOUND CHAR DATA ACTION");
          return res.json({action:"FOUND",data:JSON.parse(characters[0].data)});
        }
      }
    }
    */
  }

  if(req.method == 'POST'){
    
  }

  //res.end();
  return res.json({error:"NOTFOUND"});
};