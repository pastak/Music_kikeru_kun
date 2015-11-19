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
        <button><i className='fa fa-search' /></button>
      </form>
      <hr />
      <RecentKeywords />
      <hr />
      {
        this.state.keyword
        ? <SearchResult keyword={this.state.keyword} isForm={this.state.isForm}/>
        : (<div className='about row'>
          <h3>これは何？</h3>
          <div className='col-sm-2' />
          <div className='col-sm-8'>
            iTunes StoreとAmazon Prime Musicから検索結果を一度に表示するサービスです。ふと思い出したあの曲や友だちに勧めたいあの曲などがApple MusicやAmazon Prime Musicで視聴可能かをすぐに調べることが出来ます。<br />
            また、このウェブサイト上で試聴することも可能です。<br />
          </div>
          <div className='col-sm-2' />
        </div>)
      }
    </div>)
  }
}
