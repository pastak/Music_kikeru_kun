'use strict'
const fetch = require('node-fetch')
const OperationHelper = require('apac').OperationHelper
const Config = (process.env.NODE_ENV !== 'production') ? require('../../../config/config.json') : null
const requestAPI = (url, method) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      return res.json()
    }).then((json) => {
      resolve(json)
    })
  })
}

const iTunes = (query) => {
  query = query.map((t) => encodeURIComponent(t)).join('+')
  const url = `https://itunes.apple.com/search?term=${query}&media=music&country=jp`
  return requestAPI(url)
}

const Amazon = (query) => {
  return new Promise((resolve, reject) => {
    if (!(process.env.AWS_ID || Config.AWS_ID)) {
      return reject()
    }
    var opHelper = new OperationHelper({
        awsId:     process.env.AWS_ID || Config.AWS_ID,
        awsSecret: process.env.AWS_SECRET || Config.AWS_SECRET,
        assocId:   process.env.ASSOC_ID || Config.ASSOC_ID,
        version:   '2013-08-01',
        endPoint: 'ecs.amazonaws.jp'
    })
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'MP3Downloads',
      'Keywords': query.join(' '),
      'BrowseNode': '2381140051',
      'ResponseGroup': 'ItemAttributes, ItemIds, Images,BrowseNodes'
    }, function(err, results) {
        if (!results.ItemSearchResponse.Items[0].Item) {
          return resolve([])
        }
        resolve(results.ItemSearchResponse.Items[0].Item.filter((item) => {
          return item.ItemAttributes[0].ProductTypeName.indexOf('DOWNLOADABLE_MUSIC_TRACK') !== -1
        }))
    })
  })
}

module.exports = function *(query) {
  return [yield iTunes([query]), yield Amazon([query])]
}
