/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
//import { nanoid32 } from "../../lib/helper";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== MAPOBJECT ===]]]");
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

  }

  if(req.method == 'POST'){
    
  }
  
  //res.end();
  return res.json({error:"NOTFOUND"});
};