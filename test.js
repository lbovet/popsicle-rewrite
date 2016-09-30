/* global describe, it */

require('es6-promise').polyfill()

var popsicle = require('popsicle')
var nock = require('nock')
var expect = require('chai').expect
var rewrite = require('./')

describe('popsicle rewrite', function () {
  nock('http://rewriten.com')
    .get('/http://example.com/')
    .reply(200)

  it('should prefix all urls', function () {
    return popsicle.get('http://example.com')
      .use(rewrite('pattern'))
      .then(function (res) {
        expect(res.url).to.equal('http://rewriten.com')
      })
  })
})
