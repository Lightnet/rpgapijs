var { customAlphabet } = require('nanoid');

function nanoid16(){
  //~4 million years needed, in order to have a 1% probability of at least one collision.
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  //return customAlphabet(alphabet, 16)();
  return customAlphabet(alphabet, 2)();
}


var currentid = nanoid16();
console.log(currentid);
let count=0;
while(true){
  count++;
  let ranid = nanoid16();
  console.log(count);
  if(currentid == ranid){
    console.log("FOUND", ranid);
    console.log("Rand count", count);
    break;
  }
}