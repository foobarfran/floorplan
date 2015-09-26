
/*
 * CellsLayer class
 * A Layer which contains a cellgrid for a floor.
 */

import Layer from "./Layer";
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

  getCellsArray(){
    return [...this.cells].map(([k, v]) => v); //to array
  }

  findCellNearToPoint(point){
    let cells = this.getCellsArray();
    let cell;

    cells.forEach( c => {
      if (point.x >= c.x() && point.x <= c.x() + c.width() &&
          point.y >= c.y() && point.y <= c.y() + c.height() ) {
        cell = c;
        return false;
      }
    });

    return cell;
  }

  findCellNearToRect(rect){
    let cells = this.getCellsArray();
    let cell;

    cells.forEach( c => {
      if (rect.x <= c.x() + c.width() && rect.x + rect.width >= c.x() &&
         rect.y <= c.y() + c.height() && rect.height + rect.y >= c.y() ){
         cell = c;
         return false;
       }
    });

    return cell;
  }

  findCellsNearToPath(points, size){
    let cellIds = [];
    let cells = [];

    points.forEach( pos => {

      let cell = this.findCellNearToRect({
        x: pos.x,
        y: pos.y,
        width: size,
        height: size
      });

      if (cell && cellIds.indexOf(cell.id()) === -1){
        cellIds.push(cell.id());
        cells.push(cell);
      }
    });

    return cells;
  }

}

CellsLayer.defaults = {
  key: "cells",
  attrs: { },
  cells: [],
  cellAttrs: { }
};
