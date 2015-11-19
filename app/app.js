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
const redis = require('redis').createClient(process.env.REDIS_URL || 6379)
const render = views(path.resolve(__dirname, '../../app/views'), { map : {html : 'jade'}})

const getRecentKeyword = function () {
  return (new Promise((solve) => {
    redis.lrange('recent-keyword', -10, -1, (err, obj) => {
      solve(obj)
    })
  }))
}

router
  .get('/', function *(next) {
    this.body = yield render('index.jade', {name: "koa"})
  })
  .get('/search', function *(next) {
    this.set('Content-Type', 'application/json')
    const q = queryString.parse(this.querystring)
    this.body = yield searchMusic(q['q'])
    if (q['from'] === 'form') {
      redis.lpush('recent-keyword', q['q'])
    }
  })
  .get('/recent.json', function *(next) {
    this.set('Content-Type', 'application/json')
    this.body = yield getRecentKeyword()
  })

app.use(serve(path.resolve(__dirname, '../../public')))
app.use(router.routes())

const port = process.env.PORT || 3000

app.listen(port)

console.log('Start to listen at ' + port)
