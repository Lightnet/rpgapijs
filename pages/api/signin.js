/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getProviders } from "next-auth/react";
//import { PrismaClient } from '@prisma/client';
//import {clientDB} from '../db';
import db from "../../lib/database";

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");
  //const prisma = clientDB(PrismaClient);

  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  console.log("csrfToken:",csrfToken);
  //const providers = await getProviders();
  //console.log("Providers", providers)

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  const User = db.model('User');
  
  console.log("req.body");
  console.log(req.body);
  //console.log(req.body.firstname);
  var userData = JSON.parse(req.body);

  //const user = await User.findOne({username: userData.alias}).then(function(user){
    const user = await User.findOne({username: userData.alias}).exec();
    console.log("user");
    console.log(user);
    if(userData.isNewUser){
      if(!user){
        console.log("[newUser] NOT FOUND, creating...")
        //create user
        let newUser = new User({username: userData.alias})
        newUser.setPassword(userData.passphrase);
        try{
        let saveUser = await newUser.save();
          //if (err) return handleError(err);
          // saved!
          console.log("save user");
          return res.json(saveUser.toAuthJSON());
        }catch(e){
          return res.json({error:"FAIL"});
        }
      }else{
        console.log("[newUser] Exist");
        return res.json({error:"EXIST"});
      }
    }else{
      if(!user){
        console.log("[login] NOT FOUND")
        return res.json({error:"NOTFOUND"});
        //create user
      }else{
        console.log("[login] Exist");
        if(user.validPassword(userData.passphrase)){
          //user.toAuthJSON();
          console.log("[login] password pass!");
          return res.json(user.toAuthJSON());
        }else{
          console.log("[login] password fail!");
          return res.json({error:"PASSWORDFAIL"});
        }
      }
    }
  //});



  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};

/*

  //const allUsers  = await prisma.user.findMany({
  const users = await prisma.user.findMany({
    where:{
      alias:{
        equals:userData.alias
      }
    }
  });
  console.log("[[[=== LOGIN RESULT USER ==]]]");
  console.log(users);
  // https://next-auth.js.org/providers/credentials
  if((users.length==0) && (userData.newUser=="true")){ //not found
    console.log("[[[=== LOGIN REGISTER USER ==]]]");
    const saveUser = await prisma.user.create({
      data:{
        alias:userData.alias,
        passphrase:userData.passphrase
      }
    })
    return res.json({
      id:saveUser.id
      , name:saveUser.alias
      , role:"member"
    });
    //return res.json(saveUser);
  }
  if(users.length==1){
    console.log("[[[=== LOGIN GRANT USER ==]]]");
    return res.json({
      id:users[0].id,
      name:users[0].alias,
      role:"member"
    });  
  }



*/