
import "../../src/index.js"; // import lib
import { expect } from "chai";

import List from "../../src/floorplan/List"; // for watcher

describe("Floorplan", function(){

  it ('must exist and expose Classes', () => {
    expect(Floorplan).to.be.a("function");
    expect(Floorplan.version).to.be.ok;
    expect(Floorplan.Floor).to.be.a("function");
    expect(Floorplan.Layer).to.be.a("function");
    expect(Floorplan.ImageLayer).to.be.a("function");
    expect(Floorplan.CellsLayer).to.be.a("function");
  });

  it ('must allow to create a floorplan', () => {
    let plan = Floorplan();

    expect(plan.viewport).to.be.an('object');
    expect(plan.floors).to.be.a('object');
    expect(plan.floors.length).to.be.equal(0);
  });

  it ('must allow to create and add a Floor', () => {
    let plan = Floorplan();
    expect(plan.floors.length).to.be.equal(0);

    let floor = new Floorplan.Floor({
      name: "G"
    });

    expect(floor.options.name).to.be.equal("G");
    expect(floor.layers).to.be.a('object');
    expect(floor.layers.length).to.be.equal(0);

    plan.floors.add("G", floor);
    expect(plan.floors.length).to.be.equal(1);

    let _floor = plan.floors.get("G");
    expect(floor.options.name).to.be.equal(_floor.options.name);
  });

  it ('must allow to create Layers', () => {

    expect(() => {
      let layer = new Floorplan.Layer();
      layer.onAttach();
    }).to.throw();

    let imgLayer = new Floorplan.ImageLayer({
      image: 'test.png'
    });

    expect(imgLayer.options.image).to.be.equal('test.png');

    let plan = Floorplan();
    let floor = new Floorplan.Floor({
      name: "1st"
    });
    plan.floors.add("1st", floor);
    floor.layers.add("bg", imgLayer);

  });

});
