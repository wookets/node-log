
A facade for Winston. Really, just less typing but still Winston.


## Install

In package.json, under dependencies, you can do...

```"log": "https://github.com/wookets/node-logger/0.3.1"```


## Usage

```
var log = require('log')('api');

log('A log message', data); // equivalent to log.info();

// on the console it uses winston.cli();

log.error(err.message);

log.warn('Something bad happened, but not really that bad'); // will display in yellow font

// we can also capture logs and report on them later on (useful in one off scripts)
log.capture('name of capture');

log('normal logging going on across any category');

log.report(); // returns a json object with an event array with all logs

log.clear(); // clear the report out

```

## Example Config

```
log.config = {
  console: {
    colorize: true,
    level: 'silly'
  }
}
```

Basically, you're just setting up and configuring winston transports. More support options will be added soon.


