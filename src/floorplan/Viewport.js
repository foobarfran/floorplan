
/*
 * Viewport class
 * Manage SVG size, zoom, drag of the map, etc
 */

import Base from "./Base";
import svgPanZoom from 'svg-pan-zoom';

export default class Viewport extends Base {

  constructor(options){
    super(options);

    this.defaults(options, Viewport.defaults);
    this.init();
  }

  init() {
    let size = this.getParentSize();

    this.container = SVG(this.options.el).size("100%", "100%");

    window.setTimeout(() => { // this is to svgPanZoom to work

      this.panZoom = svgPanZoom(this.container.node, {
          panEnabled: true
        , controlIconsEnabled: true
        , zoomEnabled: true
        , dblClickZoomEnabled: true
        , mouseWheelZoomEnabled: true
        , preventMouseEventsDefault: true
        , zoomScaleSensitivity: 0.2
        , minZoom: 0.5
        , maxZoom: 10
        , fit: true
        , contain: false
        , center: true
        , refreshRate: 'auto'
        //, beforeZoom: function(){}
        //, onZoom: function(){}
        //, beforePan: function(){}
        //, onPan: function(){}
        //, customEventsHandler: {}
      });

      // expose to global for testing
      window.panZoom = this.panZoom;
    }, 1);

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
