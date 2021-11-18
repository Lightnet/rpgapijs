/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;

var MapListSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  name: {
    type:String,
    default: ''
  },
  types:[String],
  mapid: {
    type:String,
    default: ''
  },
  data: Schema.Types.Mixed,
  isHidden: {
    type:Boolean,
    default: false
  },
  x: {
    type:Number,
    default: 0
  },
  y: {
    type:Number,
    default: 0
  },
  z: {
    type:Number,
    default: 0
  },
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('MapList', MapListSchema );