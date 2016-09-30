module.exports = rewritePopsicle

function rewritePopsicle (prefix) {
  rewrite = rewrite.replace(/\/$/, '')

  return function (request, next) {
    request.url = rewrite + '/' + request.url.replace(/^\//, '')

    return next()
  }
}
