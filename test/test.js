const chakram = require('chakram')
const expect = chakram.expect;
const server = require('../server')

// Run the server
var url = undefined
var fastify = undefined

server.start({ port: 0 }, (err, server_connection) => {
    url = `http://localhost:${server_connection.server.address().port}`
    fastify = server_connection
})

function stopServer() {
    console.log("Stop the server")
    setTimeout(() => {
        fastify.close()
    }, 3000);
}



describe("Test server start", function () {
    after(function () {
        stopServer()
    })
    it("should fail - wait", function () {
        return chakram.get(url).then(function (binResponse) {
            const mockText = "human before digital"
            expect(binResponse.body.Lotrek).to.contain(mockText);
        })
    });
})


describe("", function () {
    after(function () {
        stopServer()
    })
    it("should fail - wait", function () {
        return chakram.get(url).then(function (binResponse) {
            const mockText = "human before digital"
            expect(binResponse.body.Lotrek).to.contain(mockText);
        })
    });
})
