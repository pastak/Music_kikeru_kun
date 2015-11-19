const React = require('react')
const ReactDOM = require('react-dom')
import SearchResult from './SearchResult'
import RecentKeywords from './RecentKeywords'
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: '',
      isForm: false
    }
  }
  onSubmit (event) {
    event.preventDefault()
    const keyword = ReactDOM.findDOMNode(this.refs.keyword).value
    this.setState({keyword: keyword, isForm: true})
    history.pushState('','','/?q='+keyword)
  }
  componentDidMount () {
    const keyword = this.props.keyword
    ReactDOM.findDOMNode(this.refs.keyword).value = keyword
    this.setState({keyword: keyword})
  }
  render () {
    return (<div>
      <form className='row search-form' onSubmit={this.onSubmit.bind(this)}>
        <input
          type='text'
          placeholder='Keywords'
          className='search-keyword'
          ref='keyword'/>
        <button>Search</button>
      </form>
      <hr />
      <RecentKeywords />
      <hr />
      {
        this.state.keyword
        ? <SearchResult keyword={this.state.keyword} isForm={this.state.isForm}/>
        : null
      }
    </div>)
  }
}
