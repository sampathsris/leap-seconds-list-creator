
const request = require('request');
const fs = require('fs');

const source = 'https://www.ietf.org/timezones/data/leap-seconds.list';

module.exports = (outfile) => {
    request.get(source, (error, response, body) => {
        if (error) {
            console.log('Error while retrieving from www.ietf.org: ');
            console.log('  URL: ' + source);
            console.log('  ERROR: ' + error);
            
            return;
        }
        
        let data = {
            leap_seconds: []
        };
        
        body.split('\n')                        // split text to lines
            .map((line) => {                    // remove extra \r characters
                return line.trim();
            }).filter((line) => {               // remove comments and empty lines...
                return !(                       // ... except special metadata
                    line === '' ||
                    line === '#' ||
                    line.startsWith('#\t') ||
                    line.startsWith('# '));
            }).map((line) => {                  // tokenize each line
                return line.split(/\s+/g);
            }).forEach((arr) => {               // add each line to data object
                switch (arr[0]) {
                    // last updated timestamp is prefixed with '#$'
                    case '#$':
                        data.last_updated = arr[1];
                        break;
                    
                    // expiration timestamp is prefixed with '#@'
                    case '#@':
                        data.expiration_date = arr[1];
                        break;
                    
                    // file hash is prefixed with '#h'
                    case '#h':
                        data.hash = arr.slice(1).join(' ');
                        break;
                    
                    // everything else should be leap seconds
                    default:
                        data.leap_seconds.push(arr.slice(0, 2));
                        break;
                }
            });
        
        if (!outfile) {
            console.log('No output file specified');
            return;
        }
        
        // Open file for reading and writing. The file is created (if it does
        // not exist) or truncated (if it exists).
        fs.open(outfile, 'w+', (err) => {
            if (err) {
                console.log('Error while opening output file: ');
                console.log('  FILE: ' + outfile);
                console.log('  ERROR: ' + err);
                return;
            }
            
            let json = JSON.stringify(data, null, 4);
            
            fs.writeFile(outfile, json, 'utf8', (err) => {
                if (err) {
                    console.log('Error while writing output file: ');
                    console.log('  FILE: ' + outfile);
                    console.log('  ERROR: ' + err);
                    return;
                }
                
                console.log('Done!');
            });
        });
    });
}

// allows to run from command line in the following fasion:
// > node index.js /path/to/output/file.json
require('make-runnable');
