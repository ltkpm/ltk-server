const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fs = require('fs')

var Database = function () {
    this.db_path = 'Database/database.json'
    this.existing = false
    this.adapter
    this.db
}

Database.prototype.init = function () {
    fs.exists(this.db_path, (exists) => {
        console.log(exists ? 'it\'s there' : 'no db!');
        if (exists){

            this.existing = true
            this.adapter = new FileSync(this.db_path);
            this.db = low(this.adapter)
            this.db.get('posts')
                .push({ id: 2, title: 'lowdb is awesome' })
                .write()
        } 
        else{
            this.createDb()
            this.adapter = new FileSync(this.db_path);
            this.db = low(this.adapter)
            this.db.defaults({ posts: [], user: {} })
                .write()
            this.db.get('posts')
                .push({ id: 2, title: 'lowdb is awesome' })
                .write()
        }
    });
}

Database.prototype.createDb =  function () {
    fs.writeFile(this.db_path, "", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

module.exports.Database = Database