require('dotenv').config()
var fs = require('fs');
var fetch = require('node-fetch')
var pokemonJSON = require('./pokemon.json')


function createTableRow(id, data) {
    fetch(`https://api.hubapi.com/hubdb/api/v2/tables/${id}/rows?hapikey=${process.env.API_KEY}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(function(payload) { console.log(`Pokemon sent to HubDB! \n`, data) })
        .catch(err => console.error(err))
}

module.exports.constructPokemon = function() {
    for (i in pokemonJSON) {
        if (pokemonJSON[i].types.length == 2) {
            var pokemon = JSON.stringify({
                "values": {
                	"1": pokemonJSON[i].id,
                    "2": pokemonJSON[i].name,
                    "3": pokemonJSON[i].weight,
                    "4": pokemonJSON[i].height,
                    "5": pokemonJSON[i].sprite,
                    "6": pokemonJSON[i].types[1].type.name,
                    "7": pokemonJSON[i].types[0].type.name
                    
                }
            })
        } else {
            var pokemon = JSON.stringify({
                "values": {
                	"1": pokemonJSON[i].id,
                    "2": pokemonJSON[i].name,
                    "3": pokemonJSON[i].weight,
                    "4": pokemonJSON[i].height,
                    "5": pokemonJSON[i].sprite,
                    "6": pokemonJSON[i].types[0].type.name
                }
            })
        }
        // This is where you select the HubDB you want to POST to
        createTableRow(697537, pokemon)
    }

}