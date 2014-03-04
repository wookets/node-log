
process.env.LOGGER_CONFIG_FILE = __dirname + '/config.json'

var logger = require('../');

var log1 = logger('test');
log1('testing standard log message');

var log2 = logger('data');
log2('testing meta data based in shallow', {meta: 'meta'});
log2('testing meta data based in deep', {meta: {meta: {meta: {meta: {meta: {meta: 'so deep!'}}}}}});
log2('testing multiple meta data', 'answer', 'solution');
log2('log an array of meta data', ['answer', 'solution']);

var log3 = logger('thrown');
log3.error(Error('testing an error being thrown'));

var log4 = logger('info');
log4.info('logged in as info level');

var log5 = logger('verbose');
log5.verbose('verbose logging');

var log6 = logger('duration');
log6('start');
setTimeout(function() {
  log6('end');
}, 100);

var log7 = logger('ignore');
log7('this will not be shown because it is being ignored');


var log8 = logger('noLoggly');
log8('this will not be logged to loggly but will show up on the console');

var log9 = logger('noConsole');
log9('this will not be logged to console but will be sent to loggly');


var rec = logger('recorder');
log9('this will be recorded and played back');
