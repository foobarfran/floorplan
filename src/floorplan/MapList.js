
/*
 * MapList class
 * Base class for a MapList (key, value) related operations
 */

import Base from "./Base";

export default class MapList extends Base {

  constructor(){
    super();

    this._list = new Map();
    this.length = 0;
  }

  add(key, value){
    this._list.set(key, value);
    this.length = this._list.size;
    this.emit("add", value);
  }

  has(key){
    return this._list.has(key);
  }

  get(key){
    return this._list.get(key);
  }

  remove(key){
    this._list.remove(key);
    this.length = this._list.size;
    this.emit("remove", key);
  }

  toArray(){
    return [...this._list].map(([k, v]) => v);
  }

}
