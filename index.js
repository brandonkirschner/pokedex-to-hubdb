#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs')
const getPokemon = require('./fetchPokemon.js')
const hubspotAPI = require('./hubspotAPI.js')

// content of index.js
const http = require('http')
const port = 3000


const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

// https://stackoverflow.com/questions/31195391/create-a-file-if-it-doesnt-already-exist/31195572
function createFile(filename) {
    fs.open(filename, 'r', function(err, fd) {
        if (err) {
            fs.writeFile(filename, '', function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("The file was saved!");
            });
        }
    });
}

const getQuestions = [
  {
    type : 'input',
    name : 'start',
    message : 'Choose first Pokemon by number: '
  },
  {
    type : 'input',
    name : 'end',
    message : 'Choose last Pokemon by number: '
  }
];

const sendQuestion = [{
    type : 'input',
    name : 'hubdb',
    message : 'Choose the HubDB you want to send to by id: '
  }]

program
    .version('0.0.1')
    .description('Fetch pokemon and add them to a HubDB');

program
    .command('get')
    .alias('g')
    .description('Fetch Pokemon from Pokedex API. You must set a start and end number/')
    .action(function(start, end) {
        createFile('./pokemon.json')
        prompt(getQuestions).then(function(answers) {
        	let start = parseInt(answers['start'])
        	let end = parseInt(answers['end'])
        	getPokemon.recursiveFetch(start, end)
        })
        // getPokemon.recursiveFetch(parseInt(start), parseInt(end))
    });

program
    .command('send')
    .alias('s')
    .description('Send Pokemon to HubDB. HubID must be specified. Run node index.js get before running this command.')
    .action(function(hubdb) {
    	createFile('./pokemon.json')
    	let json = require('./pokemon.json')
        prompt(sendQuestion).then(function(answers){
        	let hubdb = parseInt(answers['hubdb'])
        	hubspotAPI.constructPokemon(json, parseInt(hubdb))
        })
    });

// if(json.length < 1) {
// 	getPokemon.recursiveFetch(1, 251)
// }
// else {
// 	hubspotAPI.constructPokemon(json)
// }

program.parse(process.argv);