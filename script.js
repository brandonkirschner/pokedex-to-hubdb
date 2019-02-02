require('dotenv').config()
const fs = require('fs');
const fetch = require('node-fetch')
const chalk = require('chalk');

function Pokemon(name, weight, height, sprite, types, id) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.sprite = sprite;
    this.types = types;
    this.id = id;
}

var writeToFile = function(data) {
    fs.writeFile("pokemon.json", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Save complete')
        }
    });
}

function createTableRow(id, data) {
    fetch(`https://api.hubapi.com/hubdb/api/v2/tables/${id}/rows?hapikey=${process.env.API_KEY}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(function(payload) {
            data = JSON.parse(data)
            data["values"]["1"] = data["values"]["1"].charAt(0).toUpperCase() + data["values"]["1"].substring(1)
            console.log(chalk.green(data["values"]["1"] + ` sent to HubDB ${id}!`))
        })
        .catch(err => console.error(err))
}

var constructPokemon = function(data, hubdb) {
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
    return
}

function recursiveFetch(url, limit = 5, count = 1, output = []) {
    fetch(url + count, {
            method: 'get'
        })
        .then(function(response) {
            console.log(chalk.cyan(response.status + " " + url + count))
            console.log(chalk.red(`Pokemon #${count} encountered!`))
            return response.json();
        })
        .then(function(data) {
            let pokemon = new Pokemon(data.name, data.weight, data.height, data.sprites.front_default, data.types, data.id)
            output.push(pokemon)
            constructPokemon(pokemon, 844831)
            if (count < limit) {
                count++
                recursiveFetch(url, limit, count, output)
            } else {
                return writeToFile(output)
            }
        })
        .catch(function(err) {
            console.log('error: ' + err);
        });

}



recursiveFetch('http://pokeapi.co/api/v2/pokemon/', 5)
