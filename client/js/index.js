'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import SearchForm from './component/SearchForm'
const queryString = require('query-string')
const keyword = queryString.parse(location.search)['q'] || ''

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <SearchForm keyword={keyword} />
    </div>,
    document.querySelector('#application')
  )
  const tweetButton = document.querySelector('#tweetButton')
  tweetButton.addEventListener('click' , (event) => {
    event.preventDefault()
    const tweetUrl = `https://twitter.com/intent/tweet?hashtags=Music_kikeru_kun&related=pastak&text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(location.href)}`
    window.open(tweetUrl)
  })
})
