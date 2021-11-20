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

  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){
    
  }

  //res.end();
  return res.json({action:"NOTFOUND"});
};