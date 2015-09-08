
/*
 * Viewport class
 * Manage SVG size, zoom, drag of the map, etc
 */

import Base from "./Base";

export default class Viewport extends Base {

  constructor(options){
    super(options);

    this.defaults(options, Viewport.defaults);
    this.init();
  }

  init() {
    let size = this.getParentSize();

    this.container = SVG(this.options.el).size("100%", "100%");

    //this.container.attr({
    //  viewBox: "0 0 " + size.width + " " + size.height
    //});

    this.container.attr(this.options.attrs);
    this.container.addClass("viewport");
  }

  getParentSize(){
    let el = this.options.el;
    return {
      width: el.clientWidth,
      height: el.clientHeight
    };
  }
}

Viewport.defaults = {};
