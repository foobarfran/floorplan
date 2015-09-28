
/*
 * PlacesLayer class
 * A Layer which contains clickable places within a floor.
 * They can serve as information or used with pathfinding layer.
 */

import Layer from "./Layer";
import _ from "lodash";

export default class PlacesLayer extends Layer {

  constructor(options){
    super(options);

    this.defaults(options, PlacesLayer.defaults);
    this.container = null;

    this.places = new Map();
    this._onPlaceClick = function(){};
  }

  onAttach(parent){
    this.container = parent.group();

    this.options.places.forEach( place => {
      let p = this.container[place.type || "rect"]();
      if (place.type === "polygon"){
        p.plot(place.points);
      }

      p.attr(_.defaults(place.attrs, this.options.placeAttrs));
      this.container.add(p);

      p.id = place.id || shortid.generate();
      p.attr("id", p.id).addClass("place");
      this.places.set(p.id, p);

      p.click( () => this._onPlaceClick(p) );
    });

    this.container.attr(this.options.attrs);
    this.container.addClass("layer").addClass("places-layer");
  }

  onPlaceClick(callback){
    this._onPlaceClick = callback;
  }

}

PlacesLayer.defaults = {
  key: "places",
  attrs: { },
  placeAttrs: { }
};
