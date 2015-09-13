(function(root) {
  require("babel/register");

  //window.SVG = window.SVG || require("svg.js");

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
  Floorplan.PathFindingLayer = require("./floorplan/PathFindingLayer");

  root.Floorplan = Floorplan;
}(window || this));
