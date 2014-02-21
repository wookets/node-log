
var nconf = require('nconf');

// read in config file (or cli / env args)
nconf.argv().env().file({file: process.env.LOGGER_CONFIG_FILE || __dirname + '/../../../config.json'});

var config = nconf.get('logger') || {};

if (!config.categories) {
  config.categories = {};
}

if (config.profile === 'false' || config.profile === false) {
  config.profile = false;
} else {
  config.profile = true;
}

if (!config.console) {
  config.console = true;
}

if (!config.loggly) {
  config.loggly = false;
}

module.exports = config;

