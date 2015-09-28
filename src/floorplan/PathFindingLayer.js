
/*
 * PathFindingLayer class
 * A Layer which contains a grid with walls for a pathfinding.
 */

import Layer from "./Layer";
import _ from "lodash";
import PF from "pathfinding";

export default class PathFindingLayer extends Layer {

  constructor(options){
    super(options);

    this.defaults(options, PathFindingLayer.defaults);
    this.container = null;

    this.cells = []; // only for visualization

    this.grid = null;
    this.initMatrix(this.options.matrix, this.options.cellSize);

    this.path = [];
    this.route = [];
  }

  onAttach(parent){
    this.container = parent.group();

    if (this.options.showGrid){
      this.createVisualGrid();
    }

    this.container.attr(this.options.attrs);
    this.container.addClass("layer").addClass("pathfinding-layer");
  }

  initMatrix(matrix, cellSize){
    if (!matrix || !matrix.length){
      let mSize = this.options.matrixSize;

      if (mSize.width && mSize.height){
        mSize = {
          rows: Math.floor(mSize.height/cellSize),
          cols: Math.floor(mSize.width/cellSize)
        };
      }

      for(var y=0; y<mSize.rows ;y++){
        matrix[y] = [];
        for(var x=0; x<mSize.cols; x++){
          matrix[y][x] = 0;

          if (y === 0 || x === 0 || y === mSize.rows-1 || x === mSize.cols - 1){ // bound walls
            matrix[y][x] = 1;
          }
        }
      }
    }

    this.grid = new PF.Grid(matrix);
  }

  createVisualGrid(){
    this.options.matrix.forEach( (row, y) => {
      row.forEach( (c, x) => {
        let s = this.options.cellSize;
        let r = this.container.rect(s, s);
        r.addClass("pos-" + x + "-" + y).attr({ x: x*s, y: y*s });

        if (c){ // non walkable
          r.addClass("block").attr(this.options.nonWalkableAttrs);
        }
        else { // walkable
          r.attr(this.options.walkableAttrs);
        }

        this.container.add(r);

        /*
        // debug
        let self = this;
        r.click( function(){
          console.log(self.getPositionInGrid({ x: this.x(), y: this.y() }));
          window.pathTo(this.x(), this.y());
        });
        */

      });
    });
  }

  getPositionInGrid(pos){
    let size = this.options.cellSize;
    let x = Math.floor(pos.x / size);
    let y = Math.floor(pos.y / size);
    return [x, y];
  }

  getPointFromGrid(pos){
    let size = this.options.cellSize;
    let x = Math.floor(pos[0] * size);
    let y = Math.floor(pos[1] * size);
    return { x, y };
  }

  getCenter(pos){
    let hSize = this.options.cellSize/2;
    return {
      x: pos.x + hSize,
      y: pos.y + hSize
    };
  }

  clearPath(){
    if (this.options.showGrid){
      this.container.select("rect.route").removeClass("route");
      this.container.select("rect.marker-from").removeClass("marker-from");
      this.container.select("rect.marker-to").removeClass("marker-to");
    }
  }

  setPath(path){
    let ctn = this.container;
    this.route = [];

    path.forEach( p => {
      if (this.options.showGrid){
        ctn.select("rect.pos-" + p[0] + "-" + p[1]).addClass("route");
      }

      this.route.push(this.getPointFromGrid(p));
    });
  }

  routeTo(from, to){
    let finder = new PF.AStarFinder({ allowDiagonal: true, dontCrossCorners: true });
    let pa = this.getPositionInGrid(from);
    let pb = this.getPositionInGrid(to);

    let path = finder.findPath(pa[0], pa[1], pb[0], pb[1], this.grid.clone());
    this.clearPath();
    this.setPath(path);

    if (this.options.showGrid){ // show markers
      this.container.select("rect.pos-" + pa[0] + "-" + pa[1]).addClass("marker-from");
      this.container.select("rect.pos-" + pb[0] + "-" + pb[1]).addClass("marker-to");
    }
  }

}

PathFindingLayer.defaults = {
  key: "pathfinding",
  showGrid: false,
  attrs: { },
  matrix: [],
  matrixSize: { rows: 10, cols: 10 },
  cellSize: 20,
  walkableAttrs: { },
  nonWalkableAttrs: { }
};
