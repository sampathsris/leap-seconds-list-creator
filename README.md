# leap-seconds-list-creator
Creates a JSON file containing the leap seconds declared at https://www.ietf.org/timezones/data/leap-seconds.list.

# installation
```
npm install -g leap-seconds-list-creator
```

# usage

Consider using the static [`leap-seconds-list`](https://www.npmjs.com/package/leap-seconds-list) package, rather than using this one to dynamically create the list. `leap-seconds-list` uses this package to create it's list at development time.

## from other JavaScript
```
let creator = require('leap-seconds-list-creator');
creator('/path/to/file.json');
```

## from command line
```
$ leap-seconds-list-creator /path/to/file.json
```
