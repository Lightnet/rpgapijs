/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;
var GameMapSchema = new mongoose.Schema({
  id: {
    type:String,
    default: nanoid32
  },
  tagid: {
    type:String,
    default: ''
  },
  parenttype: {
    type:String,
    default: 'ZONE'
  },
  name: {
    type:String,
    default: ''
  },
  types:[String],
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
  range: { // min and max square 512x512 pixel or voxel
    type:Number,
    default: 512
  },
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('GameMap', GameMapSchema );