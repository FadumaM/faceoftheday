var mongoose = require("mongoose");
var config = require("../../config/config");

// Models
var Category = require("../../models/category");

// Data
var categoryData = require("../data/categories.json");

// Connect to database
mongoose.connect(config.database, function() {
  console.log("Connected to database");
});

// Drop collections
Category.collection.drop();

categoryData.forEach(function(category) {
  Category
    .create(category)
    .then(function(category) {
      console.log("[CATEGORY] " + category.name + " was created");
    });
});
