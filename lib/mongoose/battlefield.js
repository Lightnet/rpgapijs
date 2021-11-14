/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';
var BlankSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  battleid:{
    type:String,
    default: ''
  },
  areaid:{
    type:String,
    default: ''
  },
  type:{
    type:String,
    default: ''
  },
  data:{
    type:String,
    default: ''
  },
  x:{
    type:String,
    default: '0'
  },
  y:{
    type:String,
    default: '0'
  },
  z:{
    type:String,
    default: '0'
  },
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('BattleField', BlankSchema );