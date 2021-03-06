const hasha = require('hasha')

class Repository {
    constructor(repository){
        this.name = repository.name.toLowerCase()
        this.url = repository.url
        this.type = repository.type.toLowerCase()
        this.commit = repository.commit
        this.version = repository.version
        this.hash = hasha(repository.name + repository.version)
    }
}

module.exports.Repository = Repository