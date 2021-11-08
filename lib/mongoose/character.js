/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

var DataSchema = new mongoose.Schema({
  id: {
    type:String,
    default: uuidv4
  },
  userid: String,
  name: String,
  data:{
    type:String,
    default: ''
  },
  isDead:{
    type:String,
    default: ''
  },
  isLeader:{
    type:String,
    default: ''
  },
  groupId:{
    type:String,
    default: ''
  },
  date:{
    type: Date,
    default: Date.now
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('Character', DataSchema );