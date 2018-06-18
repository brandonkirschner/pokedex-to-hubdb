#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs')
const fetchPokemon = require('./fetchPokemon.js')
const hubspotAPI = require('./hubspotAPI.js')
const chalk = require('chalk');
const script = require('./script.js')

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
            fs.writeFile(filename, '[]', function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("The file was saved!");
            });
        }
    });
}

var singleScript = function() {
	 createFile('./pokemon.json')
    prompt(singleScriptQuestions).then(function(answers) {
        let start = parseInt(answers['start'])
        let end = parseInt(answers['end'])
        let hubid = parseInt(answers['hubid'])
        	script.recursiveFetch('http://pokeapi.co/api/v2/pokemon/', start, end, hubid)
    })
}

var getPokemon = function() {
    createFile('./pokemon.json')
    prompt(getQuestions).then(function(answers) {
        let start = parseInt(answers['start'])
        let end = parseInt(answers['end'])
        fetchPokemon.recursiveFetch(start, end)
    })
};

var postPokemon = function() {
    createFile('./pokemon.json')
    let cache = JSON.parse(fs.readFileSync('pokemon.json'))
    if (cache[0]) {
        prompt(sendQuestion).then(function(answers) {
            let hubdb = parseInt(answers['hubdb'])
            hubspotAPI.requestWrapper(cache, parseInt(hubdb))
        })
    } else {
        console.log("No Pokemon found. Run 'node index.js a' to catch some pokemon!")
    }
};

createFile('./pokemon.json') 

const singleScriptQuestions = [{
        type: 'input',
        name: 'start',
        message: 'Choose first Pokemon by number: '
    },
    {
        type: 'input',
        name: 'end',
        message: 'Choose last Pokemon by number: '
    },
    {
        type: 'input',
        name: 'hubdb',
        message: 'Choose the HubDB you want to send to by id: '
    }
];


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

const introQuestion = [{
    type: 'input',
    name: 'intro',
    message: 
`Type the number for the script you would like to run:\n
1. ${chalk.green('Download and upload')}\nThis will download the pokemon from PokedexAPI and upload them to the HubDB. A pokemon.json file, containing all the pokemon, will be saved\n
2. ${chalk.green('Download the Pokemon')}\nThis will download the pokemon from PokedexAPI and save them all to a pokemon.json file\n
3. ${chalk.green('Upload the Pokemon')}\nThis will upload the pokemon in the pokemon.json to a HubDB table based on ID.\n`
}]

program
    .version('0.0.1')
    .description('Fetch pokemon and add them to a HubDB');

program
    .command('get')
    .alias('g')
    .description('Fetch Pokemon from Pokedex API. You must set a start and end number/')
    .action(function() {
        createFile('./pokemon.json')
        prompt(getQuestions).then(function(answers) {
            let start = parseInt(answers['start'])
            let end = parseInt(answers['end'])
            fetchPokemon.recursiveFetch(start, end)
        })
    });

program
    .command('send')
    .alias('s')
    .description('Send Pokemon to HubDB. HubID must be specified. Run node index.js get before running this command.')
    .action(function() {
        createFile('./pokemon.json')
        let cache = JSON.parse(fs.readFileSync('pokemon.json'))
        if (!cache[0]) {
            prompt(sendQuestion).then(function(answers) {
                let hubdb = parseInt(answers['hubdb'])
                hubspotAPI.requestWrapper(cache, parseInt(hubdb))
            })
        } else {
            console.log("No Pokemon found. Run 'node index.js a' to catch some pokemon!")
        }
    });

console.log(chalk.green('Welcome to the Pokedex to HubDB Utility Script!\n'))

function intro() {
    prompt(introQuestion).then(function(answer) {
    	let input = parseInt(answer.intro)
        switch (input) {
            case 1:
                singleScript()
                break;
            case 2:
            	getPokemon()
                break;
            case 3:
            	postPokemon()
                break;
            default:
                // statements_def
                break;
        }
    })
}

intro()

program.parse(process.argv);