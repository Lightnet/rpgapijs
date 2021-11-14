/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';

var DataSchema = new mongoose.Schema({
  id: {
    type:String,
    default:''
    //default: uuidv4
    //default: nanoid32
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
    type: String,
    default: unixTime
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('Character', DataSchema );