
/*
 * Floors class
 * Holds a list of Floor.
 */

import MapList from "./MapList";
import Floor from "./Floor";

export default class Floors extends MapList {

  //TODO: change floor

  load(floors){
    floors.forEach( floor => {
      var _floor = new Floor();
      this.add(floor.name, _floor);
      _floor.load(floor);
    });
  }

  getData(){

  }

}
