/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;
var GameBaseObjectSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  homebaseid: String,
  name: String,
  data: Schema.Types.Mixed,
  x: Number,
  y: Number,
  z: Number,
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('GameBaseObject', GameBaseObjectSchema );