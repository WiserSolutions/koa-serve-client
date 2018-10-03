# koa-serve-client

Plain Koa middleware for serving the client application

## Installation

In your quadro project install dependency

`npm install @wisersolutions/koa-serve-client`

## Use

Add the middleware to Koa server:

```javascript
const { serveClient } = require('@wisersolutions/koa-serve-client')
const koa = /* ... create or get your server instance ... */
koa.use(serveClient({
  //rootDir: resolve('./'),
  //staticDir: resolve(rootDir, './static'),
  //distDir: resolve(rootDir, './dist'),
  //indexFile: resolve(distDir, './index.html'),
  //exclude: ::/^\/(?:static|api)\//.test,
  //log: ::console.log
}))
```

By default it serves:

- all content of `./static` under `/static`
- all content of `./dist` at root
- the index file for everything else except for `/static/*` and `/api/*` requests

## Development

### Install

Install dependencies using:

```sh
npm install
```

### Develop

After you modify sources, run the following (or set up your IDE to do it for you):

- format the code using `npm run format`
- lint it using `npm run lint`
- test it using `npm test`

and fix the errors, if there are any.

### Publish

Publishing is done in two steps:

1. Create a new version tag and push it to the repository:
    ```sh
    npm version <patch|minor|major>
    git push --follow-tags
    ```
1. Build and publish the new version as a npm package:
    ```sh
    npm publish --access public
    ``` 
