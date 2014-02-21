
var config = require('./config');
var humanize = require('./humanize');
var loggly = require('loggly');

// setup config if available
var client = null;
if (config.loggly) {
  client = loggly.createClient(config.loggly);
}

module.exports = function(category, level, msg, meta, ms) {
  if (client == null) return;
  var data = {category: category, lapse: humanize(ms), level: level, msg: msg};
  if (msg instanceof Error) {
    data.level = 'error';
    data.msg = msg.message;
    data.stacktrace = msg.stack;
  }
  if (meta) {
    data.meta = meta;
  }
  client.log(data);//, config.loggly.tags);
}
