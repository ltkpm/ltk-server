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
    setTimeout(() => {
        fastify.close()
    }, 1000);
}

describe("Test server start", function () {
    after(function () {
        stopServer()
    })
    it("Server home page", function () {
        return chakram.get(url).then(function (ltkResponse) {
            const mockText = "human before digital"
            expect(ltkResponse.body.Lotrek).to.contain(mockText);
        })
    })
})

describe("Test server api", function () {
    before(function () {
       // server.resetDb()    
    })

    after(function () {
        stopServer()
    })

    describe("Test server api - Post", function () {

        afterEach(function () {
            // runs after each test in this block
            server.resetDb()
        });

        it("Add package - should work", function () {

            const package = {
               "name": "Lotrrèk",
                "version": "1",
                "url": "lotrek.it",
                "type": "npm" 
                }
            return chakram.post(url + "/api/repos/", package).then(function (ltkResponse) {
                expect(ltkResponse).to.have.status(200)
            })
        })

        it("Add package - 400 duplicate", function () {

            const package = {
               "name": "Lotrrèk",
                "version": "1",
                "url": "lotrek.it",
                "type": "npm" 
                }
            chakram.post(url + "/api/repos/", package)

            return chakram.post(url + "/api/repos/", package).then(function (ltkResponse) {
                expect(ltkResponse).to.have.status(400)
            })
        })

        it("Add package - 400", function () {

            const package = {
                "name": "Lotrèk",
                "version": "1",
                "url": "lotrek.it",
                }

            return chakram.post(url + "/api/repos/", package).then(function (ltkResponse) {
                expect(ltkResponse).to.have.status(400)
            })
        })
    })

    describe("Test server api - Get", function () {
        const package = {
            "name": "Lotrèk",
            "version": 1,
            "url": "lotrek.it",
            "type": "npm"
        }

        before(function () {
            chakram.post(url + "/api/repos/", package)
        })

        after(function () {
            server.resetDb()
        })

        it("Get all package", function () {
            return chakram.get(url + "/api/repos/").then(function (ltkResponse) {
                expect(ltkResponse).to.have.status(200)
                expect(ltkResponse.body[0]).to.contain(package)
            })
        })

        it("Get specific package", function () {
            return chakram.get(url + "/api/repos/Lotrèk").then(function (ltkResponse) {
                expect(ltkResponse).to.have.status(200)
                expect(ltkResponse.body).to.contain(package)
            })
        })
        
    })

})
