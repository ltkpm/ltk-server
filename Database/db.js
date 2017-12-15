const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const fs = require("fs")
const hasha = require('hasha')

class Database {

  constructor() {
    this.db_path = "Storage/"
    this.db_file
    this.existing = false
    this.adapter
    this.db
  }

  init(db_name, schema) {
    if (!db_name.endsWith(".json")) {
      this.db_file = db_name + '.json'
    } else {
      this.db_file = db_name;
    }

    fs.exists(this.db_path + this.db_file, exists => {
      console.log(exists ? "it's there" : "no db!")
      if (exists) {
        this.existing = true
        this.initAdapter()
      } else {
        this.createDb()
        this.initAdapter()
        this.initDatabase(schema)
      }
    })
  }

  createDb() {
    if (!fs.existsSync(this.db_path)) {
      fs.mkdirSync(this.db_path);
    }
    fs.writeFile(this.getFullPath(), "", function (err) {
      if (err) {
        return console.log(err)
      }
      console.log("The file was saved!")
    })
  }

  initAdapter() {
    this.adapter = new FileSync(this.db_path + this.db_file)
    this.db = low(this.adapter)
  }

  initDatabase(schema) {
    this.db.defaults(schema).write()
  }

  getFullPath() {
    if ((this.db_file == undefined) || (this.db_path == undefined)) return undefined
    return "" + this.db_path + this.db_file
  }

  addElement(node, repository) {
    let element = this.db.get(node)
      .find({
        name: repository.name
      }).value()
      console.log(element)
    if (element == undefined) {
      this.db
        .get(node)
        .push(repository)
        .write()
    }
  }
}

module.exports.Database = Database