# WIP!
# Pokedex to HubDB
#### A script for downloading Pokemon data and uploading them to HubSpot's [HubDB](https://designers.hubspot.com/docs/tools/hubdb)

## Description
##### A nodejs script that downloads (GETs) Pokemon from the [Pokéapi](https://pokeapi.co/) and uploads (POSTs) them to a HubSpot HubDB table.

## Instructions
1. Clone repo
2. Create a .env file in the root of the project
3. Open the .env on a code/text editor and add `API_KEY=YOUR-ACTUAL-API-KEY-GOES-HERE`
4. Run `npm install` in the root of the project using a CLI
5. Run `node index.js` to get import the pokemon. You will see "Save Completed" in the CLI's console when the pokemon.json file has been updated with the pokemon
6. Open up `hubspotAPI.js` and update `createTableRow(697486, pokemon)` with the ID of the HubDB table you wish to publish to.
7. Run `node index.js` again to post the data to HubDB.

## Warning
#### Currently 1-150 pokemon is not possible. There is an issue where at some point in the loop an invalid JSON response is returning 

