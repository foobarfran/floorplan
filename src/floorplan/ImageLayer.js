
/*
 * ImageLayer class
 * A Layer which contains an Image, could be used to set a background in a Floor
 */

import Layer from "./Layer";
import Snap from "snapsvg";

export default class ImageLayer extends Layer {

  constructor(options){
    super(options);

    this.defaults(options, ImageLayer.defaults);
    this.container = null;
  }

  onAttach(parent){
    this.container = parent.group();
    this.container.addClass("layer").addClass("image-layer");
    this.svgImage = this.container.image(this.options.image);
    this.svgImage.attr(this.options.attrs);
  }

}

ImageLayer.defaults = {
  key: "image",
  image: "",
  attrs: {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    preserveAspectRatio: "xMinYMin slice"
  }
};
