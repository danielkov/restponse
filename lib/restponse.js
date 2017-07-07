const STATUS_CODES = require('http').STATUS_CODES

class Restponse {
  constructor(options) {
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
}

module.exports = Restponse
