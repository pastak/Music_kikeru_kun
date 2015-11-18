'use strict'
require("babel-polyfill")
const path = require('path')
const Koa = require('koa')
const router = require('koa-router')()
const views = require('co-views')
const serve = require('koa-static')
const queryString = require('query-string')
const searchMusic = require('./libs/searchMusic')
const app = new Koa()
const render = views(path.resolve(__dirname, '../../app/views'), { map : {html : 'jade'}})

router
  .get('/', function *(next) {
    this.body = yield render('index.jade', {name: "koa"})
  })
  .get('/search', function *(next) {
    this.set('Content-Type', 'application/json')
    const q = queryString.parse(this.querystring)
    this.body = yield searchMusic(q['q'])
  })

app.use(serve(path.resolve(__dirname, '../../public')))
app.use(router.routes())

const port = process.env.PORT || 3000

app.listen(port)

console.log('Start to listen at ' + port)
