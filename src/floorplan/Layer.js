
/*
 * Layer class
 * Base class for Layers.
 */

import Base from "./Base";

export default class Layer extends Base {

  constructor(options){
    super(options);
  }

  onAttach(parent) {
    throw new Error("must override Layer:onAttach(parent)");
  }

}
