'use strict'

var fastify = require('fastify')()

fastify.get("/api", async (request, reply) => {
  return { "No buono" };
});

fastify.listen(3000, function(err) {
  if (err) throw err;
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
});