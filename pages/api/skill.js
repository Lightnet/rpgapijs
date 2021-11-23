/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res) => {
  console.log("[[[=== SKILL ===]]]");
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

  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){

  }
  //res.end();
  return res.json({error:"NOTFOUND"});
};
