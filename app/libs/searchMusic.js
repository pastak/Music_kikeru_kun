'use strict'
const fetch = require('node-fetch')
const OperationHelper = require('apac').OperationHelper
const Config = require('../../../config/config.json')
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

  var opHelper = new OperationHelper({
      awsId:     process.env.AWS_ID || Config.AWS_ID,
      awsSecret: process.env.AWS_SECRET || Config.AWS_SECRET,
      assocId:   process.env.ASSOC_ID || Config.ASSOC_ID,
      version:   '2013-08-01',
      endPoint: 'ecs.amazonaws.jp'
  })
  return new Promise((resolve, reject) => {
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'MP3Downloads',
      'Keywords': query.join(' '),
      'ResponseGroup': 'Medium'
    }, function(err, results) {
        resolve(results.ItemSearchResponse.Items[0].Item)
    })
  })
}

module.exports = function *(query) {
  return [yield iTunes([query]), yield Amazon([query])]
}
