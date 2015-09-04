
import Base from "./Base";
import Viewport from "./Viewport";
import Floors from "./Floors";

export default class Floorplan extends Base {

  constructor(options){
    super(options);

    // avoid recursive on DOM element
    let el = options.el;
    delete options.el;

    this.defaults(options, Floorplan.defaults);
    this.options.el = el || document.body;

    this.init();
  }

  init() {
    this.viewport = new Viewport({
      el: this.options.el,
      attrs: this.options.viewport
    });

    this.floors = new Floors();
    this.floors.on("add", floor => {
      floor.onAttach(this.viewport.container);
    });
  }

}

Floorplan.defaults = {
  viewport: {
    
  }
};
