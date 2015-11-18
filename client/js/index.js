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
})
