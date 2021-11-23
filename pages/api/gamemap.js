/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { nanoid16 } from "../../lib/helper";

export default async (req, res) => {
  console.log("[[[=== Map ===]]]");
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
  const GameMap = db.model('GameMap');
  
  if(req.method == 'GET'){
    //let gamemaps = await GameMap.find({tagid:data.id}).exec();
    //return res.json({action:"MAPS",gamemaps:zones});
  }

  if(req.method == 'POST'){
    let data = req.body;
    console.log(data);
    
    if(data.action){

      if(data.action=='GAMEMAPS'){
        console.log('GAMEMAPS');
        let gamemaps = await GameMap.find({tagid:data.id}).exec();
        return res.json({action:"MAPS",gamemaps:gamemaps});
      }

      if(data.action=='CREATE'){
        console.log(data);
        console.log('CREATE');
        let newGameMap = new GameMap({
          userid:userid
          , tagid:data.id
          , name:nanoid16()
        });
        let saveGameMap = await newGameMap.save();
        return res.json({action:"CREATE",gamemap:saveGameMap});
      }
    }
  }

  if(req.method == 'DELETE'){
    let data = req.body;
    let deleteGameMap = await GameMap.findOneAndDelete({id:data.id})
    console.log("deleteGameMap: ",deleteGameMap);
    return res.json({action:"DELETE",id:data.id});
  }
  //res.end();
  return res.json({error:"NOTFOUND"});
};
