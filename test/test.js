const Restponse = require('../index')
const { notDeepEqual, ok, deepEqual, equal } = require('assert')

describe('Restponse', () => {
  describe('constructor', () => {
    it('should create a new instance of Restponse', () => {
      const instance = new Restponse()

      ok(instance instanceof Restponse)
    })
  })

  describe('no arguments', () => {
    it('should have a regular response with no constructor arguments', () => {
      const restponse = new Restponse()

      deepEqual(restponse[200], {status: '200', reason: 'OK'})
    })
  })

  describe('adding arguments to the response', () => {
    it('should add a regular string argument to the returned object', () => {
      const restponse = new Restponse({
        version: '1.0'
      })

      deepEqual(restponse[304], {status: '304', reason: 'Not Modified', version: '1.0'})
    })

    it('should execute a function with the options object as an argument', () => {
      const restponse = new Restponse({
        url: function ({status}) {
          return `https://github.com/restponse/${status}`
        }
      })

      deepEqual(restponse[200], {status: '200', reason: 'OK', url: 'https://github.com/restponse/200'})
    })

    it('should add the corresponding value from an object as an argument', () => {
      const message = 'Everything is ok.'
      const restponse = new Restponse({
        message : {
          200: message
        }
      })

      deepEqual(restponse[200], {status: '200', reason: 'OK', message})
    })

    it('should not add the previous value to statuses that do not match', () => {
      const message = 'Everything is ok.'
      const restponse = new Restponse({
        message : {
          200: message
        }
      })

      notDeepEqual(restponse[201], {status: '200', reason: 'OK', message})
    })
  })
})

describe('method(s) of instance', () => {
  describe('extend()', () => {
    it('should be a method of the instance', () => {
      const restponse = new Restponse()

      equal(typeof restponse.extend, 'function')
    })
    it('should accept 2 parameters, of number and object', () => {
      const restponse = new Restponse()

      ok(restponse.extend(200, {}))
    })
    it('should return an extended object of the used parameter at first position', () => {
      const restponse = new Restponse()
      const response = restponse.extend(200, {note: 'Test'})
      const expected = {
        status: 200,
        reason: 'OK',
        note: 'Test'
      }

      deepEqual(response, expected)
    })
    it('should extend an empty object when given a status code that is not valid', () => {
      const restponse = new Restponse()
      const response = restponse.extend(600, {note: 'Test'})
      const expected = {
        note: 'Test'
      }

      deepEqual(response, expected)
    })
  })

})
