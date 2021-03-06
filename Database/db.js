const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const fs = require("fs")
const hasha = require('hasha')

class Database {

  constructor(defaultNode) {
    this.db_path = "Storage/"
    this.db_file
    this.existing = false
    this.adapter
    this.db
    this.node = defaultNode
  }

  init(db_name, schema) {
    if (!db_name.endsWith(".json")) {
      this.db_file = db_name + '.json'
    } else {
      this.db_file = db_name;
    }

    fs.exists(this.db_path + this.db_file, exists => {
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

  deleteDb(){
    this.db.get(this.node).remove().write()
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

  addElement(repository) {
    let element = this.db.get(this.node)
      .find({
        hash: repository.hash
      }).value()
    if (element == undefined) {
      this.db
        .get(this.node)
        .push(repository)
        .write()

        return true
    }

    return false
  }

  getElementByName(repository_name) {
    return this.db.get('repos').find({ name: repository_name }).value()
  }

  getAllElement() {
    return this.db.get('repos').value()
  }

  deleteElement(repository_hash) {
    return this.db.get('repos').remove({ hash: repository_hash }).write()
  }
}

module.exports.Database = Database