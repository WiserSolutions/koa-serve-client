const serve = require('koa-static')
const compose = require('koa-compose')
const { createReadStream } = require('fs')
const { resolve } = require('path')

const serveIndex = (indexFile, exclude) => async (ctx, next) => {
  if (exclude(ctx.path)) return await next()

  ctx.type = 'html'
  ctx.body = createReadStream(indexFile)
}

const serveClient = ({
  rootDir = resolve('./'),
  staticDir = resolve(rootDir, './static'),
  distDir = resolve(rootDir, './dist'),
  indexFile = resolve(distDir, './index.html'),
  exclude = path => /^\/api\//.test(path),
  log = console.log.bind(console) // eslint-disable-line no-console
} = {}) => {
  log && log(`Serving /static, /dist, and index in ${rootDir}`)
  return compose([serve(staticDir), serve(distDir), serveIndex(indexFile, exclude)])
}

module.exports = {
  serveIndex,
  serveClient
}
