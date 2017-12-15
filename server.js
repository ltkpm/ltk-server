'use strict'

const fastify = require('fastify')()
const Database = require('./Database/db.js').Database
const Validation = require('./Validation/validation.js').Validation
const DefaultSchema = require("./Model/DefaultSchema.js").DefaultSchema
const Repository = require("./Model/Repository.js").Repository

var repository_db = new Database()
var validator = new Validation()
var default_schema = new DefaultSchema()
var fakeRepo = {
  name: 'pippo',
  version: '1',
  type: 'npm',
  url: 'emfwoefnwe',
  commit: 'jwfef'
}
repository_db.init('repos', default_schema.repository_schema);

fastify.get("/api", async (request, reply) => {
  console.log("d")
  repository_db.addElement('repos', fakeRepo)
  return { Hello: "No buono" };
  
});


fastify.get("/api/all", async (request, reply) => {
  return repository_db.getAll()
});

fastify.listen(3000, function(err) {
  if (err) throw err;
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
});

