const fs = require('fs')

function createFile(filename) {
    fs.open(filename, 'r', function(err, fd) {
        if (!err) {
            fs.writeFile(filename, '', function(err) {
                if (err) {
                    console.log(err);
                    console.log("The file was saved!");
                } else {
                    console.log("The file exists!");
                }
            });
        }
    });

//     fs.writeFile(filename, '', (err) => {  
//     // throws an error, you could also catch it here
//     if (err) throw err;

//     // success case, the file was saved
//     console.log('Lyric saved!');
// });
}
createFile('pokemon.json')
var json = require('./pokemon.json')

// fs.writeFile('pokemon.json', '', (err) => {  
//     // throws an error, you could also catch it here
//     if (err) throw err;

//     // success case, the file was saved
//     console.log('pokemon.json created');
// });

// fs.closeSync(fs.openSync('pokemon.json', 'a'))