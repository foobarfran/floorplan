
/*
 * Viewport class
 * Manage SVG size, zoom, drag of the map, etc
 */

import Base from "./Base";
import svgPanZoom from "svg-pan-zoom";
import Hammer from "hammerjs";

export default class Viewport extends Base {

  constructor(options){
    super(options);

    this.defaults(options, Viewport.defaults);
    this.init();
  }

  init() {
    let size = this.getParentSize();

    this.container = SVG(this.options.el).size("100%", "100%");

    window.setTimeout(() => { // this is for svgPanZoom to work

      this.panZoom = svgPanZoom(this.container.node, {
        panEnabled: true,
        controlIconsEnabled: true,
        zoomEnabled: true,
        dblClickZoomEnabled: true,
        mouseWheelZoomEnabled: true,
        preventMouseEventsDefault: true,
        zoomScaleSensitivity: 0.2,
        minZoom: 0.5,
        maxZoom: 3,
        fit: false,
        contain: true,
        center: false,
        refreshRate: "auto",
        //beforeZoom: function(){},
        //onZoom: function(){},
        beforePan: Viewport.beforePan,
        //onPan: function(){},
        customEventsHandler: Viewport.eventHandlers
      });

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

  panTo(pos){
    var sizes = this.panZoom.getSizes();

    this.panZoom.pan({
      x: -(((sizes.viewBox.x + pos.x) * sizes.realZoom) - sizes.width/2),
      y: -(((sizes.viewBox.y + pos.y) * sizes.realZoom) - sizes.height/2)
    });
  }

}

Viewport.defaults = {};

Viewport.beforePan = function(oldPan, newPan) {
  var sizes = this.getSizes();

  var
    hLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + sizes.width,
    vLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + sizes.height;

  return {
    x: Math.max(hLimit, Math.min(0, newPan.x)),
    y: Math.max(vLimit, Math.min(0, newPan.y))
  };
};

Viewport.eventHandlers = {

  haltEventListeners: ["touchstart", "touchend", "touchmove", "touchleave", "touchcancel"],

  init: function(options) {
    var instance = options.instance
      , initialScale = 1
      , pannedX = 0
      , pannedY = 0;

    // Init Hammer
    // Listen only for pointer and touch events
    this.hammer = Hammer(options.svgElement, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
    });

    // Enable pinch
    this.hammer.get("pinch").set({enable: true});

    // Handle double tap
    this.hammer.on("doubletap", function(ev){
      instance.zoomIn();
    });

    // Handle pan
    this.hammer.on("panstart panmove", function(ev){
      // On pan start reset panned variables
      if (ev.type === "panstart") {
        pannedX = 0;
        pannedY = 0;
      }

      // Pan only the difference
      instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY});
      pannedX = ev.deltaX;
      pannedY = ev.deltaY;
    });

    // Handle pinch
    this.hammer.on("pinchstart pinchmove", function(ev){
      // On pinch start remember initial zoom
      if (ev.type === "pinchstart") {
        initialScale = instance.getZoom();
        instance.zoom(initialScale * ev.scale);
      }

      instance.zoom(initialScale * ev.scale);
    });

    // Prevent moving the page on some devices when panning over SVG
    options.svgElement.addEventListener("touchmove", function(e){ e.preventDefault(); });
  },

  destroy: function(){
    this.hammer.destroy();
  }
};
