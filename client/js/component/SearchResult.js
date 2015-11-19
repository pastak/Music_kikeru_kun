const React = require('react')
const fetch = window.fetch || require('whatwg-fetch')
const ReactDOM = require('react-dom')
import AppleMusic from './AppleMusic'
import AmazonMusic from './AmazonMusic'
export default class SearchResult extends React.Component {
  constructor (props) {
    super(props)
    this.keyword = props.keyoword
    this.state = {
      result: [{},[]]
    }
  }
  componentDidMount () {
    this.updateResult(this.props.keyword)
  }
  componentWillReceiveProps (nextProps) {
    this.keyword = nextProps.keyword
    this.updateResult()
  }
  updateResult (keyword) {
    keyword = keyword || this.keyword
    if (!keyword) return
    fetch(`/search?q=${keyword}${this.props.isForm ? '&from=form':''}`)
      .then((res) => {return res.json()})
      .then((json) => {
        this.setState({result: json})
      })
  }
  render () {
    return (<div>
      <h2>Results on iTunes</h2>
      <AppleMusic result={this.state.result[0]}/>
      <h2>Results on Amazon Music</h2>
      <AmazonMusic result={this.state.result[1]}/>
    </div>)
  }
}
