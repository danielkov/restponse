const STATUS_CODES = require('http').STATUS_CODES

/**
  * @class Restponse
  * @constructor
  * @param {object} options - options to extend each response code with.
  */
class Restponse {
  constructor (options) {
    /**
      * Creating response messages on initialization.
      * This saves some time when serving requests.
      **/
    for (let code in STATUS_CODES) {
      let opt = Object.assign({}, options)
      this[code] = {}
      opt.status = code
      opt.reason = STATUS_CODES[code]

      for (let option in opt) {
        let o = opt[option]
        let optionToAdd = typeof o === 'function' ?
          o(opt) :
          typeof o === 'object' && o[code] ?
            o[code] :
            o
        if (typeof optionToAdd === 'object') break
        this[code][option] = optionToAdd
      }
    }
  }
  /**
    * @method extend - returns a clone of the corresponding response status.
    * @param {number} code - the status code of the object to be extended (e.g.: 200)
    * @param {object} data - an object to be merged with the clone of the original object and returned
    * @return {object}
    */
  extend (code, data) {
    return Object.assign(this[code] || {}, data)
  }
}

module.exports = Restponse
