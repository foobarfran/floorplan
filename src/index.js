(function(root) {
  require("babel/register");

  var Entry = require("./floorplan");

  var Floorplan = function(options) {
    return new Entry(options);
  };

  Floorplan.version = require("../package.json").version;

  Floorplan.Floor = require("./floorplan/Floor");
  Floorplan.Layer = require("./floorplan/Layer");
  Floorplan.ImageLayer = require("./floorplan/ImageLayer");
  Floorplan.CellsLayer = require("./floorplan/CellsLayer");
  Floorplan.PointsLayer = require("./floorplan/PointsLayer");

  root.Floorplan = Floorplan;
}(window || this));
