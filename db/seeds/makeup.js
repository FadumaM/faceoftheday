var mongoose = require("mongoose");
var config = require("../../config/config");

// Models
var Category = require("../../models/category");
var Makeup = require("../../models/makeup");

// Data
var makeupData = require("../data/hobbies.json");

// Connect to database
mongoose.connect(config.database, function() {
  console.log("Connected to database");
});

// Drop collections
Makeup.collection.drop();

Object.keys(makeupData).forEach(function(makeupCategory) {
  Category
    .findOne({
      name: makeupCategory
    })
    .then(function(category) {
      makeupData[makeupCategory].forEach(function(makeup) {
        var newMakeup = new Makeup(makeup);
        newMakeup.category = category._id;
        newMakeup
          .save()
          .then(function(savedMakeup) {
            console.log("[MAKEUP] " + savedMakeup.name + " was created");
          })
          .catch(function(err) {
            console.log("Makeup save error:", err);
          });
      });
    })
    .catch(function(err) {
      console.log("Category find (makeup) error:" + err);
    });
});
