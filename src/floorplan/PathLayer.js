
/*
 * PathLayer class
 * A Layer which contains a set of points for a floor.
 */

import Layer from "./Layer";
import _ from "lodash";
import shortid from "shortid";

export default class PathLayer extends Layer {

  constructor(options){
    super(options);

    this.defaults(options, PathLayer.defaults);
    this.container = null;

    this.points = [];
    this.path = null;
  }

  onAttach(parent){
    let points = this.options.points;
    this.container = parent.group();

    this.container.attr(this.options.attrs);
    this.container.addClass("layer").addClass("path-layer");

    if (points.length){
      this.setPath(points);
    }
  }

  setPath(points){
    this.points = _.cloneDeep(points);

    if (this.path){
      this.path.remove();
    }

    let path = "";
    this.points.forEach( (p, i) => {
      if (i === 0) { path = "M"; } // is first - MoveTo
      else { path += "L"; } // LineTo
      path += p.x + " " + p.y;
    });

    this.path = this.container.path(path);
    this.path.fill("none");
    this.container.add(this.path);
  }

}

PathLayer.defaults = {
  key: "path",
  attrs: { },
  points: []
};
