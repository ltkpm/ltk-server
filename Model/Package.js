const hasha = require('hasha')

class Package {
    constructor(package){
        this.name = package.name
        this.url = package.url
        this.type = package.type
        this.commit = package.commit
        this.version = package.version
        this.hash = hasha(this.name + this.version)
    }
}

module.exports.Package = Package