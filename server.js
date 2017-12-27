'use strict'

const fastify = require('fastify')()
const minimist = require('minimist')
const Database = require('./Database/db.js').Database
const Validation = require('./Validation/Validation.js').Validation
const DefaultSchema = require("./Model/DefaultSchema.js").DefaultSchema
const Repository = require("./Model/Repository.js").Repository

function start(opts, callback) {

  var validator = new Validation()
  var default_schema = new DefaultSchema()
  var repository_db_node = "repos"
  var repository_db = new Database(repository_db_node)
  const api_prefix = "/api"

  repository_db.init(repository_db_node, default_schema.repository_schema);

  fastify.get(api_prefix, async (request, reply) => {
    repository_db.addElement('repos', repo)
    return { Hello: "No buono" };
  });

  fastify.post(api_prefix + "/add", async (request, reply) => {
    let response = undefined
    let tmp_repo = new Repository(request.body)
    let result = validator.validateRepository(tmp_repo)
    if (result) {
      repository_db.addElement(repository_db_node, tmp_repo)
      response = { Result: "Added to db!" }
    }
    else {
      response = { Result: "Oh no!" }
    }
    return response
  })

  fastify.get(api_prefix + "/:repo", async (request, reply) => {
    console.log(request.params)
    let result = repository_db.getElementByName(request.params.repo)
    if (result != undefined)
      return result
    else return "Error 404"
  });

  fastify.listen(opts.port, function (err) {
    if (err) throw err;
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  });
}

if (require.main === module) {
  // $ node server.js -p 8080
  start(minimist(process.argv.slice(2), {
    integer: ['port'],
    alias: {
      port: 'p'
    },
    default: {
      port: 3000
    }
  }), (err, instance) => {
    if (err) throw err
    console.log(`server listening on ${instance.server.address().port}`)
  })
}

// Here we are exposing the function that starts the server
// in this way inside the test files we can require and run it.
module.exports = { start }