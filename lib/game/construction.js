/*
  LICENSE: MIT
  Created by: Lightnet
*/

// ref
// https://satisfactory.fandom.com/wiki/Satisfactory_Wiki

export class Building{

  constructor(args){
    args = args || {};
    this.name= args.name || 'building';
    this.description= args.description || 'none';
    this.costs= args.costs || [];
    this.buildtime= args.buildtime || 200;
    this.level = args.level || 0;
    this.mode = args.mode || 'idle'; //build, produce

    return this;
  }
}

export class Producing extends Building{
  constructor(args){
    super(args)
    args = args || {};
    this.name = 'Refinery';

    this.producecost = args.producecost || [];
    this.producetime = args.producetime || 5000;
    this.produceitem = args.produceitem || 'engeryore';

  }
}

export class Refinery extends Producing{
  constructor(args){
    super(args)
    this.name = 'Refinery';
    return this;
  }
}

export class Shipyard extends Producing{
  constructor(args){
    super(args)
    this.name = 'Shipyard';
    return this;
  }
}

export class Depot extends Producing{
  constructor(args){
    super(args)
    this.name = 'Depot';
    return this;
  }
}

export class Miner extends Producing{
  constructor(args){
    super(args)
    this.name = 'Miner';
    return this;
  }
}

export class Foundry extends Producing{
  constructor(args){
    super(args)
    this.name = 'Foundry';
    return this;
  }
}

export class Packager extends Producing{
  constructor(args){
    super(args)
    this.name = 'Packager';
    return this;
  }
}

export class Smelter extends Producing{
  constructor(args){
    super(args)
    this.name = 'Smelter';
    return this;
  }
}

export class Constructor extends Producing{
  constructor(args){
    super(args)
    this.name = 'Constructor';
    return this;
  }
}

export class RoboticFactory extends Producing{
  constructor(args){
    super(args)
    this.name = 'Robotic Factory';
    return this;
  }
}

export class VechicleFactory extends Producing{
  constructor(args){
    super(args)
    this.name = 'Vechicle Factory';
    return this;
  }
}

export class Starport extends Producing{
  constructor(args){
    super(args)
    this.name = 'Starport';
    return this;
  }
}


export function getConstruction(){
  let building = [];
  building.push(new Miner());
  building.push(new Refinery());
  building.push(new Smelter());
  building.push(new Constructor());
  building.push(new Shipyard());

  building.push(new Packager());
  building.push(new Depot());

  building.push(new RoboticFactory());
  building.push(new VechicleFactory());


  building.push(new Starport());
  building.push(new Shipyard());

  return building;
}