const React = require('react')
const ReactDOM = require('react-dom')
export default class AmazonMusic extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.result) return false
    const length = window.innerWidth >= 600 ? 12 : 5
    const results = this.props.result.slice(0, length).map((item) => {
      const artistName = item.ItemAttributes[0].Creator[0]._
      return (<div className='item amazon-item' key={item.ASIN[0]}>
        <a target='_blank'
           href={decodeURIComponent(item.DetailPageURL[0])}
           className='item-collection-title'>
            <img src={item.MediumImage[0].URL[0]} /><br />
            {item.ItemAttributes[0].Title[0]}
        </a><br />
        <a target='_blank'
           href={`http://www.amazon.co.jp/s/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Dprime-digital-music&tag=pastalablog-22&field-keywords=${encodeURIComponent(artistName)}`}>
            {artistName}
        </a><br/>
        <audio src={`http://www.amazon.co.jp/gp/dmusic/get_sample_url.html/?ASIN=${item.ASIN[0]}`} controls="true" />
      </div>)
    })
    return (<div className='amazon-item-list item-list row'>
      {results}
    </div>)
  }
}
