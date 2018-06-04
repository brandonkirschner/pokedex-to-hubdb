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

var constructPokemon = function(data, hubdb) {
    for (i in data) {
        if (data[i].types.length == 2) {
            var pokemon = JSON.stringify({
                "values": {
                    "1": data[i].name,
                    "2": data[i].id,
                    "3": data[i].weight,
                    "4": data[i].height,
                    "5": data[i].sprite,
                    "6": data[i].types[1].type.name,
                    "7": data[i].types[0].type.name,
                    "8": data[i].types[1].type.name + " " + data[i].types[0].type.name

                }
            })
        } else {
            var pokemon = JSON.stringify({
                "values": {
                    "1": data[i].name,
                    "2": data[i].id,
                    "3": data[i].weight,
                    "4": data[i].height,
                    "5": data[i].sprite,
                    "6": data[i].types[0].type.name,
                    "8": data[i].types[0].type.name
                }
            })
        }
        createTableRow(hubdb, pokemon)
    }
    return
}

module.exports = { constructPokemon }