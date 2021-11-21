/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;
var HomeBaseSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  username: String,
  name: String,
  ismain:Boolean,
  data: Schema.Types.Mixed,
  isprotect: String,
  protecttime: String,
  mapid: String,
  x: Number,
  y: Number,
  z: Number,
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('HomeBase', HomeBaseSchema );