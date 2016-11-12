# leap-seconds-list-creator
Creates a JSON file containing the leap seconds declared at https://www.ietf.org/timezones/data/leap-seconds.list.

# installation
```
npm install leap-seconds-list-creator
```

# usage

## from other JavaScript
```
let creator = require('leap-seconds-list-creator');
creator('/path/to/file.json');
```

## from command line
```
$ leap-seconds-list-creator /path/to/file.json
```
