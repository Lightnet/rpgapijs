/*
  LICENSE: MIT
  Created by: Lightnet
*/

/* 
  Create creature base.
    for role playing game creature create in database with stats
*/

// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
// https://javascript.info/import-export

// https://tvtropes.org/pmwiki/pmwiki.php/Main/StandardFantasyRaces
// https://d20.pub/resources/459-historic-professions-jobs-and-trades-for-fantasy-rpg-settings/
// https://www.ffcompendium.com/h/jobs.shtml


/*

Place holder idea required stats

Archer - Uses bows and arrows
Bard - Sings to cause effects
Beastmaster - Controls other monsters
Berserker - Attacks uncontrollably
Black Mage - Uses magic to harm enemies
Blue Mage - Learns enemy skills
Chemist - Uses items more effectively
Dancer - Dances to cause effects
Fighter - Physical fighter who uses various attacks.
Gambler - Abilities are based on chance
Gunner - Uses rifles or pistols
Knight - Physical class that relies exclusively on high defense and attack.
Magic Knight - Combines black magic and physical attacks
Monk - Fights with bare hands and chakra
Ninja - Throws items to cause damage
Paladin - Combines physical strength with white magic and can cover allies.
Scholar - Can look at enemy statistics
Summoner - Summons huge monsters to fight
Thief - Steals from enemy
Time Mage - Uses magic to speed up or slow down actions
Warrior - Initial sword user class.
White Mage - Uses magic to heal allies
Puppet Master controls an automaton who can be customized and commanded, similar to a Beastmaster.
Gladiator
Sniper An class with a combination of Assassin and Archer characteristics. It's status attacks are based on the range of the weapon.
rune seeker - 
Elementalist 
*/

export default class Creature{
  constructor(arg){

    if(!arg){
      arg={}
    }

    this.id=arg.id || "";
    this.name=arg.name || "";
    this.races = arg.races || [];
    this.gender = arg.gender || "";
    this.jobs = arg.jobs || [];
    this.isDead = arg.isDead || false;

    this.level=arg.level || 0;
    this.experience=arg.experience || 0;
    this.experiencenext=arg.experiencenext || 50;
    this.giveexp=arg.giveexp || 10;

    this.healthpoint=arg.healthpoint || 100;
    this.healthpointmax=arg.healthpointmax || 100;
    this.magicpoint=arg.magicpoint || 0;
    this.magicpointmax=arg.magicpointmax || 0;

    this.attackpoint =arg.attackpoint || 1;
    this.defencepoint =arg.defencepoint || 1;

    this.magicattackpoint =arg.magicattackpoint || 0;
    this.magicdefencepoint =arg.magicdefencepoint || 0;
    
  }
}

export function getSelectSpecies(){
  return [
    {name:"Human"},
    {name:"Elves"},
    {name:"Dwarves"},
    {name:"Orcs"},
    {name:"Gaint"},
    {name:"Beast Men"},
    {name:"Fairies"},
    {name:"Dragon"}
    //{name:"Undead"} // need to add alive or undead
  ]
}

export function getSelectJobs(){
  return [
    {name:"Warrior"},
    {name:"Mage"},
    {name:"Archer"},
    {name:"Summoner"},
    {name:"Beast Master"},
    {name:"Thief"},
    {name:"Chemist"},
    {name:"Bard"},
    {name:"Dancer"},
    {name:"Fighter"},
    {name:"Gunner"},
    {name:"Monk"},
    {name:"Illusionist"},
    {name:"Scholar"},
    {name:"Sage"}
  ]
}

export function getRace(){
  const _race=[
    {name:"human"},
    {name:"elf"},
    {name:"fairy"},

    {name:"demon"},
    {name:"angle"},

    {name:"gobin"},
    {name:"wolf"},


    {name:"pig"},
    {name:"dog"},
    {name:"horse"},


    {name:"plant"}
  ];

  //return 

}

export function getLevelExpNext(num){
  // level * multi * experience
  return num * 1.5 * 50; 
}


export function createCreature(arg){

}