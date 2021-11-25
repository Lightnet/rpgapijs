/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://masteringjs.io/tutorials/mongoose/save

import { getSession } from "next-auth/react";
//import { nanoid32 } from "../../lib/helper";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { unixTime } from "../../lib/helper";

export default async (req, res) => {
  console.log("[[[=== BUILDING ===]]]");
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
  const Building = db.model('Building');

  //const Character = db.model('Character');
  if(req.method == 'GET'){
    
    let buildings = await Building.find({userid:userid}).exec();
    console.log("Characters:", buildings.length);
    //console.log(characters)
    //check character if exist
    if(buildings.length == 0){
      return res.json({action:"NOTFOUND"});
    }
    if(buildings.length >= 1){
      let builds = [];
      for(let building of buildings){
        let _build = building.data;
        _build.id = building.id;
        builds.push(_build)
      }

      return res.json({action:"BUILDINS",buildings:builds});
    }
  }

  if(req.method == 'POST'){
    
    let data = req.body;
    console.log('ACTION',data)
    let newBuilding = await Building({
      userid:userid,
      data:data.building
    })

    let saveBuilding = await newBuilding.save();

    return res.json({action:"CREATE", building:saveBuilding});
  }

  if(req.method == 'PATCH'){
    let data = req.body;
    if(data.mode){
      if(data.mode=='BUILD'){
        console.log("BUILD.....")
        const building = await Building.findOne({id:data.id}).exec();
        if(building.data.mode=='BUILD'){
          //return res.json({error:"BUILDALREADY"});
          let remaintime = building.data.buildtime - unixTime();
          if(remaintime <=0){
            //check if finish build
            building.data.mode = 'idle';
            building.data.buildtime = 0;

            let query = {
              id:data.id
            }
            let update ={
              data:building.data
            }

            let doc = await Building.findOneAndUpdate(query, update, {
              new: true
            });
            
            return res.json({action:"BUILDFINISH",time:0});
          }else{
            //return time remain
            return res.json({action:"BUILDTIME",time:building.data.buildtime});
          }
        }
        building.data.mode = 'BUILD';
        building.data.buildtime = building.data.buildtime + unixTime();
        console.log(building.data.buildtime)
        //let obj = building.data;
        let query = {
          id:data.id
        }
        let update ={
          data:building.data
        }

        let doc = await Building.findOneAndUpdate(query, update, {
          new: true
        });
        console.log(doc)
        return res.json({action:"BUILDTIME",time:building.data.buildtime});
      }
    }

    if(data.action){
      if(data.action=='CHECKBUILD'){
      
      }  
    }

  }

  //res.end();
  return res.json({error:"NOTFOUND"});
};