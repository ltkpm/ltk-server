const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fs = require('fs')

var Database = function () {
    this.db_path = '/Database/database.json'
    this.existing = false
    this.adapter
    this.db = low(adapter);
}

Database.prototype.init() = function () {
    fs.exists('/Database/database.json', (exists) => {
        console.log(exists ? 'it\'s there' : 'no db!');
        if (exists){
            this.existing = true
        } 
        else{
            this.createDb()
            this.adapter = new FileSync("database.json");
        }

    });
}

Database.prototype.createDb =  function () {
    fs.write(this.db_path,(error) => {
        console.error("Can't write file")
    })
}