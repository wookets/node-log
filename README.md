
A logger inspired by debug, with a lean on loggly, and configured via nconf.


## Install

In package.json, under dependencies, you can do...

```"log": "https://github.com/wookets/node-log/0.1.0"```


## Usage

```
var log = require('log')('api');

log('A log message', data); // equivalent to log.info();

// on the console
//   API  A log message
//         {data}

log.error(Error('a booboo happened!'));

log.warn('Something bad happened, but not really that bad'); // will display in yellow font
```

## Example Config file

The config file is entirely optional and I have attempted to default settings to sane defaults
in a development environment.

```


```

Since everything is category based, you can ignore categories and / or levels.

Has built-in support for loggly, you just need to add to your config.json file and it will work.

You can also shut off the console.logs in the config file.


