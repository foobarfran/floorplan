
/*
 * List class
 * Base class for a List related operations
 */

import Base from "./Base";
import _ from "lodash";

export default class List extends Base {

  constructor(){
    super();

    this._list = new Array();
    this.length = 0;
  }

  add(value){
    this._list.set(key, value);
    this.length = this._list.length;
    this.emit("add");
  }

  at(index){
    return this._list[index];
  }

  remove(index){
    this._list.splice(index, 1);
    this.length = this._list.size;
    this.emit("remove");
  }

  toArray(){
    return _.clone(this._list);
  }

}
