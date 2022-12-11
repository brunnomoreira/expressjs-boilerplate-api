/**
 * Helper to read values from process.env
 * 
 * @param {String} key 
 * @param {any} defaultValue 
 * @param {String|Number|Boolean} parseTo 
 * @returns
 */
 module.exports = function(key, defaultValue = null, parseTo = String) {
  if(process.env.hasOwnProperty(key)) {
    return parseTo(process.env[key]);
  }

  return defaultValue;
}