
/**
 * This will make a Date human readable. Taken from TJ's debug. Thanks Canada.
 * @param ms
 * @returns {string}
 */
module.exports = function(ms) {
  var sec = 1000;
  var min = 60 * 1000;
  var hour = 60 * min;
  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};
