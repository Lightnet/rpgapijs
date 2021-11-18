/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getSession } from "next-auth/react";
//import { nanoid32 } from "../../lib/helper";
import db,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== MAPOBJECT ===]]]");
  console.log("req.method: ",req.method)

  const session = await getSession({ req });

  let {error, userid, username} = await sessionTokenCheck(session);
  console.log(error);
  console.log(userid);
  console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  //const Character = db.model('Character');
  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){
    
  }
  
  //res.end();
  return res.json({action:"NOTFOUND"});
};