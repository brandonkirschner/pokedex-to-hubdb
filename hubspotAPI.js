require('dotenv').config()
const fs = require('fs');
const fetch = require('node-fetch')
const chalk = require('chalk');

function createTableRow(id, data) {
    fetch(`https://api.hubapi.com/hubdb/api/v2/tables/${id}/rows?hapikey=${process.env.API_KEY}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(function(payload) { console.log(chalk.green(`Pokemon sent to HubDB! \n`), chalk.yellow(data)) })
        .catch(err => console.error(err))
}

function constructAndSendPokemon(data, hubdb) {
    if (data.types.length == 2) {
        var pokemon = JSON.stringify({
            "values": {
                "1": data.name,
                "2": data.id,
                "3": data.weight,
                "4": data.height,
                "5": data.sprite,
                "6": data.types[1].type.name,
                "7": data.types[0].type.name,
                "8": data.types[1].type.name + " " + data.types[0].type.name

            }
        })
    } else {
        var pokemon = JSON.stringify({
            "values": {
                "1": data.name,
                "2": data.id,
                "3": data.weight,
                "4": data.height,
                "5": data.sprite,
                "6": data.types[0].type.name,
                "8": data.types[0].type.name
            }
        })
    }
    createTableRow(hubdb, pokemon)
}


var requestWrapper = function(data, hubdb) {
	Array.isArray(data) ? data.forEach( function(e) { constructAndSendPokemon(e) }) : constructAndSendPokemon(data)
}

module.exports = { requestWrapper }