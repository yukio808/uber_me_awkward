'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  // reads the directory
  .readdirSync(__dirname)
  // filters out hidden files and index.js
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  // for every .js file
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    // creates a model
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize connection
db.sequelize = sequelize;
// sequelize helpers and datatypes
db.Sequelize = Sequelize;

module.exports = db;
