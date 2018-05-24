# WIP!
# Pokedex to HubDB
#### A script for downloading Pokemon data and uploading them to HubSpot's [HubDB](https://designers.hubspot.com/docs/tools/hubdb)

## Description
##### A nodejs script that downloads (GETs) Pokemon from the [Pokéapi](https://pokeapi.co/) and uploads (POSTs) them to a HubSpot HubDB table.

## HubDB Requirements
#### This script requires a HubDB table with the following columns (in the order from left to right):
1. Number
2. Name
3. Weight
4. Height
5. Sprite
6. Type 1
7. Type 2

## Instructions
1. Clone repo
2. Create a .env file in the root of the project
3. Open the .env on a code/text editor and add `API_KEY=YOUR-ACTUAL-API-KEY-GOES-HERE`
4. Run `npm install` in the root of the project using a CLI
5. Run `node index.js` to get import the pokemon. You will see "Save Completed" in the CLI's console when the pokemon.json file has been updated with the pokemon
6. Open up `initScrips.js`. On line 13 you can configure the start and limit of the request (e.g. 1-150)
7. Open up `hubspotAPI.js` and update `createTableRow(697486, pokemon)` with the ID of the HubDB table you wish to publish to.
8. Run `node index.js` again to post the data to HubDB.

## Warning
#### Currently 1-150 pokemon is not possible. There is an issue where at some point in the loop an invalid JSON response is returning.
#### Be careful of rate limiting (will work on that)

