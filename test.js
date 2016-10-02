/* global describe, it */

require('es6-promise').polyfill()

var popsicle = require('popsicle')
var nock = require('nock')
var expect = require('chai').expect
var rewrite = require('./')

describe('popsicle rewrite', function () {
  var rewritePlugin = rewrite({
    'non-matching': 'rewritten-non-matching',
    'm.(.)ching': 'rewrit$1en'
  })

  it('should rewrite matching url', function () {
    nock('http://rewritten.com')
      .get('/')
      .reply(200)
    return popsicle.get('http://matching.com/')
      .use(rewritePlugin)
      .then(function (res) {
        expect(res.url).to.equal('http://rewritten.com/')
      })
  })

  it('should not rewrite non-matching url', function () {
    nock('http://other.com')
      .get('/')
      .reply(200)
    return popsicle.get('http://other.com/')
      .use(rewritePlugin)
      .then(function (res) {
        expect(res.url).to.equal('http://other.com/')
      })
  })
})
