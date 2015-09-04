
/*
 * CellsLayer class
 * A Layer which contains a cellgrid for a floor.
 */

import Layer from "./Layer";
import Snap from "snapsvg";
import _ from "lodash";
import shortid from "shortid";

export default class CellsLayer extends Layer {

  constructor(options){
    super(options);

    this.defaults(options, CellsLayer.defaults);
    this.container = null;

    this.cells = new Map();
  }

  onAttach(parent){
    let cells = this.options.cells;
    this.container = parent.group();

    cells.forEach( c => {
      let r = this.container.rect();
      r.attr(_.defaults(c, this.options.cellAttrs));
      this.container.add(r);

      c.id = c.id || shortid.generate();
      this.cells.set(c.id, r);
    });

    this.container.attr(this.options.attrs);
    this.container.addClass("layer").addClass("cells-layer");
  }

}

CellsLayer.defaults = {
  key: "cells",
  attrs: {

  },
  cells: [],
  cellAttrs: {
    fill: "#bada55",
    fillOpacity:0.1,
    stroke: "#bada55",
    strokeWidth: 2
  }
};
