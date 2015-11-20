const React = require('react')
const fetch = window.fetch || require('whatwg-fetch')
const ReactDOM = require('react-dom')
import AppleMusic from './AppleMusic'
import AmazonMusic from './AmazonMusic'
export default class SearchResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      result: [{},[]],
      loading: false
    }
  }
  componentDidMount () {
    this.updateResult()
  }
  componentWillReceiveProps (nextProps) {
    this.updateResult(nextProps)
  }
  updateResult (props) {
    props = props || this.props
    const keyword = props.keyword
    if (!keyword) return
    this.setState({loading: true})
    const isForm = props.isForm || this.props.isForm
    fetch(`/search?q=${keyword}${isForm ? '&from=form':''}`)
      .then((res) => {return res.json()})
      .then((json) => {
        this.setState({result: json, loading: false})
      })
  }
  render () {
    if (this.state.loading) {
      return (<div className='loading-container'>
        <i className='fa fa-spinner'/> Loading results
      </div>)
    }
    return (<div className='result-container'>
      <h2><i className='fa fa-music' /> Results on iTunes</h2>
      <AppleMusic result={this.state.result[0]}/>
      <h2><i className='fa fa-amazon'/> Results on Amazon Prime Music</h2>
      <AmazonMusic result={this.state.result[1]}/>
    </div>)
  }
}
