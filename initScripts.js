var fs = require('fs');
var fetch = require('node-fetch')

function Pokemon(name, weight, height, sprite, types, id) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.sprite = sprite;
    this.types = types;
    this.id = id;
}

module.exports.getPokemon = function (options = {start: 1, limit: 3, stats: []}) {
	let endpoint = 'http://pokeapi.co/api/v2/pokemon/'
	let pokemonArr = []
	for(var i = options.start; i < options.limit + 1; i++) {
		let url = endpoint + i + '/'
		console.log(url)
		pokemonArr.push(
				fetch(url)
				.then(function(res){
					return res.json()
				})
				.catch(err => console.error(err))
			)		
	}
	return Promise.all(pokemonArr).then(function(data) {
		let payload = []
		for (i in data) {
			let pokemon = new Pokemon(data[i].name, data[i].weight, data[i].height, data[i].sprites.front_default, data[i].types, data[i].id)
			// console.log(pokemon)
			payload.push(pokemon)
		}
		fs.writeFile("pokemon.json", JSON.stringify(payload), function(err) {
		    if (err) {
		        console.log(err);
		    }
		    else {
		    	console.log('Save complete')
		    }
		});
		console.warn('Number of Pokemon imported: ' + data.length)
		return data
	})
	.catch(err => console.error(err))

}