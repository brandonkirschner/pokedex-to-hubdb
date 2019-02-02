# WIP!
# Pokedex to HubDB

#### A node.js script that fetches Pokemon from the [Pokéapi](https://pokeapi.co/) and uploads them to a HubSpot [HubDB](https://designers.hubspot.com/docs/tools/hubdb) table.

## HubDB Requirements
#### This script requires a HubDB table with the following columns (in the order from left to right):
1. Name
2. Number
3. Weight
4. Height
5. Sprite
6. Type 1
7. Type 2

Make sure your HubDB table is published!

## Instructions
1. Clone repo or download zip and extract folder
2. Create a .env file in the root of the project
3. Open the .env on a code/text editor and add `API_KEY=YOUR-ACTUAL-API-KEY-GOES-HERE`
4. Run `npm install` in the root of the project using a CLI
5. Run `npm start` or `node index.js` to display the instruction screen.

### Supported commands
1 Run `node index.js g` to begin the fetch process. A prompt will begin, asking you for the starting pokemon number and the ending pokemon number (e.g. 1, 150). 

You will see "Save Completed" in the CLI's console when the pokemon.json file has been updated with the pokemon. Your pokemon will be stored in a local pokemon.json file. This will be overwritten anytime you run this command.

2 Run `node index.js s` to begin the send to HubDB process. A prompt will begin, asking for the HubDB's ID. When you enter the HubDB's ID, the script will begin sending (POST) the pokemon to the specified HubDB.

