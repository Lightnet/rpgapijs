/*
  LICENSE: MIT
  Created by: Lightnet  
*/

/*
  Information:
    To keep the setup simple.
  mongodb
*/
// https://next-auth.js.org/adapters/mongodb

//Import the mongoose module
import mongoose from 'mongoose';
import UserSchema from './mongoose/user';

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/rpg';

var db;
export default async function clientDB(){

  if(db){
    console.log("LOCAL REUSED")
    return db;
  }

  if(global.db){
    console.log("GLOBAL REUSED")
    return global.db;
  }

  console.log("init DB");
  //require('./mongoose/permission');
  //require('./mongoose/settings');
  try{
    //var mongoose = require('mongoose');
    mongoose.Promise = Promise;
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  }catch(e){
    console.log(e)
  }
  //const UserSchema = require('./mongoose/user');
  mongoose.model('User', UserSchema)
  
  require('./mongoose/character');
  require('./mongoose/battlefield');
  require('./mongoose/item');
  require('./mongoose/inventory');
  require('./mongoose/zone');
  require('./mongoose/gamemap');
  require('./mongoose/mapobject');

  require('./mongoose/homebase');
  require('./mongoose/gamebaseobject');
  require('./mongoose/game');
  require('./mongoose/building');
  //Get the default connection
  db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', err => {
    console.log(`DB connected`);
  })
  db.on('connected', () => {
    console.log('connected to mongodb');
  });
  db.on('disconnected', () => {
    console.log('connection disconnected');
  });
  
  global.db = db;
  return db;
}

export async function sessionTokenCheck(session){
  return new Promise( async (resolve, reject) => {
    if(session){
      if(!session.user.name){
        resolve({error:"FAIL",userid:null,username:null});
      }
      if(!session.user.token){
        resolve({error:"FAIL",userid:null,username:null});
      }

      if(session.user.token){
        const cdb = await clientDB();
        const User = cdb.model('User');
        const user = await User.findOne({username: session.user.name}).exec();
        if(typeof session.user.token == "string"){
          //console.log("STRING DATA...");
          if(user){
            //console.log("FOUND???");
            let bcheck = user.checkToken(session.user.token);
            //console.log("TOKEN: ", bcheck);
            //console.log(user);
            if(bcheck){
              // pass
              resolve({error:null,userid:user.id,username:user.username});
            }else{
              resolve({error:"FAIL",userid:null,username:null});
            }
          }else{
            resolve({error:"FAIL",userid:null,username:null});
          }
        }
      }
    }else{
      resolve({error:"FAIL",userid:null,username:null});
    }
  });
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
export async function testCall(){
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
      resolve( {error:"test" ,user:null});
    //}, 300);
  });
}