const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fs = require("fs");

var Database = function() {
  this.db_path = "Database/";
  this.existing = false;
  this.adapter;
  this.db;
};

Database.prototype.init = function(db_name) {
  this.db_path += db_name;
  fs.exists(this.db_path, exists => {
    console.log(exists ? "it's there" : "no db!");
    if (exists) {
      this.existing = true;
      this.initAdapter();
    } else {
      this.createDb();
      this.initAdapter();
      this.initDatabase();
    }
  });
};

Database.prototype.createDb = function() {
  fs.writeFile(this.db_path, "", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

Database.prototype.initAdapter = function() {
  this.adapter = new FileSync(this.db_path);
  this.db = low(this.adapter);
};

Database.prototype.initDatabase = function() {
  this.db.defaults().write(); //Rimane da mettere i default
};

Database.prototype.addElement = function(node,package) {
  this.db
    .get(node)
    .push(package)
    .write();
};

module.exports.Database = Database;
