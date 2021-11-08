/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

//import { nanoid } from 'nanoid'
import { customAlphabet } from 'nanoid';

//model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"

// https://zelark.github.io/nano-id-cc/

//const { customAlphabet } = require('nanoid');
//const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//const nanoid = customAlphabet(alphabet, 16);
//nanoid() //=> "bZMZ62iI2YJVUX7U"

// 24 char  ~52 trillion years needed, in order to have a 1% probability of at least one collision.

export function nanoid16(){
  //~4 million years needed, in order to have a 1% probability of at least one collision.
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 16)();
}

export function nanoid32(){
  // ~107 billion years needed, in order to have a 1% probability of at least one collision.
  //nanoid() //=> "zTzQvWe5X0irVfJeQJ6GzS6DhGBux79c"
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 32)();
}