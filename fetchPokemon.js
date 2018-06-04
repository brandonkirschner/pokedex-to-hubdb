const request = require('request')
const fs = require('fs')
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
            console.log(chalk.green('Save complete'))
        }
    });
}

var recursiveFetch = function(start = 1, end = 150, pokemonArr = []) {
    let resursiveFetchPromise = new Promise(function(resolve, reject) {
        console.log(chalk.red(`pokemon #${start} encountered!`))
        let url = `https://pokeapi.co/api/v2/pokemon/${start}`
        request.get(url, (err, res, body) => {
            let parsedBody = JSON.parse(body)

            if (err) {
                console.log(err)
            }

            let pokemon = new Pokemon(parsedBody.name, parsedBody.weight, parsedBody.height, parsedBody.sprites.front_default, parsedBody.types, parsedBody.id)
            pokemonArr.push(pokemon)
            console.log(chalk.green(`${parsedBody.name} caught!`))
            resolve(start < end ? recursiveFetch(start + 1, end, pokemonArr): writeToFile(pokemonArr))
        })
    })
    return resursiveFetchPromise
}

module.exports = { recursiveFetch }