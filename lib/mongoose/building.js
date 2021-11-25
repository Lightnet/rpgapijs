/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;
var BuildingSchema = new mongoose.Schema({
  id: {
    type:String,
    default: nanoid32
  },
  userid: String,
  data: Schema.Types.Mixed,
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Building', BuildingSchema );