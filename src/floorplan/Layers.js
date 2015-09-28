
/*
 * Layers class
 * A list of Layer
 */

import MapList from "./MapList";

export default class Layers extends MapList {

  //TODO: toggle layers visibility

  load(layers){
    layers.forEach( layer => {
      var Layer = layer.class.split('.').reduce( (obj, i) => obj[i], window);
      var _layer = new Layer(layer);
      this.add(layer.name, _layer);
    });
  }

  getData(){

  }

}
