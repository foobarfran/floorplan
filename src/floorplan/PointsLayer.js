
/*
 * PointsLayer class
 * A Layer which contains a set of points for a floor.
 */

import Layer from "./Layer";
import _ from "lodash";
import shortid from "shortid";

export default class PointsLayer extends Layer {

  constructor(options){
    super(options);

    this.defaults(options, PointsLayer.defaults);
    this.container = null;

    this.points = new Map();
  }

  onAttach(parent){
    let points = this.options.points;
    this.container = parent.group();

    points.forEach( p => {
      let r = this.container.circle();
      r.attr(_.defaults(p, this.options.pointAttrs));
      this.container.add(r);

      p.id = p.id || shortid.generate();
      this.points.set(p.id, r);
    });

    this.container.attr(this.options.attrs);
    this.container.addClass("layer").addClass("points-layer");
  }

  toPointsArray(){
    return [...this.points].map(([k, v]) => v);
  }
}

PointsLayer.defaults = {
  key: "position",
  attrs: { },
  points: [],
  pointAttrs: {
    r: 10
  }
};
