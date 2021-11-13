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

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/rpg';

var db;

if(!db){
  db = global.db;
}
//db;
//db = null || db;

//console.log("database:");
//console.log(db);
if(!db){
  console.log("init DB")
  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
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
  require('./mongoose/user');
  require('./mongoose/character');
  require('./mongoose/battlefield');
  require('./mongoose/item');
  //require('./mongoose/permission');
  //require('./mongoose/settings');

  global.db = db;
}else{
  console.log("REUSE DB")
}

module.exports = db;

