const hasha = require('hasha')

class Repository {
    constructor(repository){
        this.name = repository.name
        this.url = repository.url
        this.type = repository.type
        this.commit = repository.commit
        this.version = repository.version
        this.hash = hasha(this.name + this.version)
    }
}

module.exports.Repository = Repository