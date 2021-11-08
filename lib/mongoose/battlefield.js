/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

var BlankSchema = new mongoose.Schema({
  id: {
    type:String,
    default: uuidv4
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
  date:{
    type: Date,
    default: Date.now
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('BattleField', BlankSchema );