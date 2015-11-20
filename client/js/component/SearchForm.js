const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')
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
    history.pushState('','','/?q='+encodeURIComponent(keyword))
    document.title = `「${keyword}」の曲聞けるの見つける君 | その曲聞けるの見つける君`
  }
  componentDidMount () {
    const keyword = this.props.keyword
    ReactDOM.findDOMNode(this.refs.keyword).value = keyword
    this.setState({keyword: keyword})
  }
  render () {
    return (<div>
      <div className='row'>
        <div className='col-sm-2' />
        <div className='col-sm-8'>
          <form className='search-form' onSubmit={this.onSubmit.bind(this)}>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Keywords'
                className='form-control input-lg search-keyword'
                ref='keyword'/>
              <div className='input-group-btn'>
                <button className='btn btn-default btn-lg' onClick={this.onSubmit.bind(this)}><i className='fa fa-search' /></button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-sm-2' />
      </div>
      {(document.documentElement.dataset.env === 'production')
        ? (<div className='ad'>
            <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client='ca-pub-4787283240527546'
               data-ad-slot='6939564609'
               data-ad-format='auto'>
            </ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>)
        : null}
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
