#!/usr/bin/env node

const initScript = require('./initScripts.js')
var fs = require('fs')
const fileExists = require('file-exists');

// content of index.js
const http = require('http')
const port = 3000


const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})


initScript.getPokemon()
const hubspotAPI = require('./hubspotAPI.js')
hubspotAPI.constructPokemon()