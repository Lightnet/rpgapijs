/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';
const Schema = mongoose.Schema;
var ItemSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid:{
    type: String,
    default: ''
  },
  name:{
    type: String,
    default: ''
  },
  description:{
    type: String,
    default: ''
  },
  types:[String],
  data:Schema.Types.Mixed,
  isSingle:{
    type: Boolean,
    default: false
  },
  stock:{
    type: Number,
    default: 1
  },
  stockmax:{
    type: Number,
    default: 999
  },
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Item', ItemSchema );