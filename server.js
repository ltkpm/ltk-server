'use strict'

const fastify = require('fastify')()
const Database = require('./Database/db.js').Database

var database = new Database()
database.init()

fastify.get("/api", async (request, reply) => {
  return { Hello: "No buono" };
});


fastify.get("/api/all", async (request, reply) => {
  
});

fastify.listen(3000, function(err) {
  if (err) throw err;
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
});