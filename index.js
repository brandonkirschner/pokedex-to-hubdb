#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs')
const getPokemon = require('./fetchPokemon.js')
const hubspotAPI = require('./hubspotAPI.js')
const chalk = require('chalk');

// content of index.js
const http = require('http')
const port = 3000


const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

console.log(chalk.green('Welcome to the Pokedex to HubDB Utility Script!'))
console.log(chalk.green('Below are two commands that can be used:\n'))
console.log("1. " + chalk.red("node index.js a") + " - used to fetch the pokemon. Start and end pokemon must be specified by number")
console.log("2. " + chalk.red("node index.js s") + " - used to send pokemon to a hubdb table. Id of the HubDB table can be specified by number")
console.log("\nA " + chalk.red(".env") + " file in the root of this project, with your " + chalk.red("HubSpot API Key") + ", is required")


// https://stackoverflow.com/questions/31195391/create-a-file-if-it-doesnt-already-exist/31195572
function createFile(filename) {
    fs.open(filename, 'r', function(err, fd) {
        if (err) {
            fs.writeFile(filename, '[]', function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("The file was saved!");
            });
        }
    });
}

createFile('./pokemon.json')

const getQuestions = [{
        type: 'input',
        name: 'start',
        message: 'Choose first Pokemon by number: '
    },
    {
        type: 'input',
        name: 'end',
        message: 'Choose last Pokemon by number: '
    }
];

const sendQuestion = [{
    type: 'input',
    name: 'hubdb',
    message: 'Choose the HubDB you want to send to by id: '
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
    });

program
    .command('send')
    .alias('s')
    .description('Send Pokemon to HubDB. HubID must be specified. Run node index.js get before running this command.')
    .action(function(hubdb) {
        createFile('./pokemon.json')
        let cache = JSON.parse(fs.readFileSync('pokemon.json'))
        if (cache[0]) {
            prompt(sendQuestion).then(function(answers) {
                let hubdb = parseInt(answers['hubdb'])
                hubspotAPI.constructPokemon(json, parseInt(hubdb))
            })
        } else {
            console.log("No Pokemon found. Run 'node index.js a' to catch some pokemon!")
        }
    });

program.parse(process.argv);