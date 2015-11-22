const React = require('react')
const ReactDOM = require('react-dom')
const fetch = window.fetch || require('whatwg-fetch')
export default class RecentKeywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recent: ''
    }
  }
  componentDidMount () {
    fetch('/recent.json').then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({recent: json})
    })
  }
  onClick (keyword) {
    ga('send', 'event', 'recent-keyword', 'click', keyword)
  }
  render () {
    if (!this.state.recent) return false
    return (<div className='recent-keywords'>Recent Keywords:
    {this.state.recent.map((item, index) => {
      return (<span key={index} className='recent-keyword'>
          <a href={`/?q=${item}`} onClick={ () => this.onClick(item) }>{item}</a>
        {(this.state.recent.length - 1 > index) ? ' | ' : ''}</span>)
    })}
    </div>)
  }
}
