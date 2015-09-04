
/*
 * Base class
 */

import _ from "lodash";
import {EventEmitter} from "events";

export default class Base extends EventEmitter {

  defaults(options, defaults){
    this.options = _.defaultsDeep(options || {}, defaults);
  }

}
