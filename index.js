const serve = require('koa-static')
const mount = require('koa-mount')
const compose = require('koa-compose')
const { createReadStream } = require('fs')
const { resolve } = require('path')

const serveStatic = (staticDir, options) => mount('/static', serve(staticDir, options))

const serveDist = (distDir, options) => serve(distDir, options)

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
  exclude = path => /^\/(?:static|api)\//.test(path),
  log = console.log.bind(console) // eslint-disable-line no-console
} = {}) => {
  log && log(`Serving /static, /dist, and index in ${rootDir}`)
  return compose([serveStatic(staticDir), serveDist(distDir), serveIndex(indexFile, exclude)])
}

module.exports = {
  serveStatic,
  serveDist,
  serveIndex,
  serveClient
}
