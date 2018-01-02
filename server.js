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
    reply.send("Welcome to the API service")
  });

  fastify.post(api_prefix + "/repos/", async (request, reply) => {
    let response = undefined
    let result_validation = validator.validateRepository(request.body)
    if (result_validation) {
      let tmp_repo = new Repository(request.body)
      let result_db = repository_db.addElement(tmp_repo)
      if(result_db)
        response = { Result: "Added to db!" }
      else {
        response = { Result: "This repo already exists" }
        reply.code(400)
      }
    }
    else {
      response = { Result: "Oh no! Your package is not valid" }
      reply.code(400)
    }
    reply.send(response)
  })

  fastify.get(api_prefix + "/repos/:repo", async (request, reply) => {
    let response = repository_db.getElementByName(request.params.repo)
    if (response != undefined)
      reply.send(response)
    else reply.code(404).send("Specified repo doesn't exists")
  })

  fastify.get(api_prefix + "/repos/", async (request, reply) => {
    let response = repository_db.getAllElement()
    if (response != undefined)
      reply.send(response)
    reply.code(400).send("Something went wrong")
  })

  fastify.delete(api_prefix + "/repos/:repo_hash", async (request, reply) => {
    let response = repository_db.deleteElement(request.params.repo_hash)
    if (response != undefined)
      reply.send(response)
    else reply.code(404).send("Specified repo doesn't exists")
  })

  fastify.get("/", async (request, reply) => {
     reply.send({ Lotrek: 'human before digital' })
  })
  
  fastify.listen(opts.port, function (err) {
    if (err) throw err;
    callback(err, fastify)
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  })
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