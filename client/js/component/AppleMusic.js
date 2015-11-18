const React = require('react')
const ReactDOM = require('react-dom')
export default class AppleMusic extends React.Component {
  constructor (props) {
    super(props)
  }
  openItunes (event) {
    event.preventDefault()
    window.location.href = event.target.href.replace(/^http/,'itms')
  }
  render () {
    if (!this.props.result.results) return false
    const length = window.innerWidth >= 600 ? 12 : 5
    const results = this.props.result.results.slice(0, length).map((item) => {
      return (<div className='item itunes-item' key={item.trackId}>
        <img src={item.artworkUrl100} /><br />
        <a target='_blank' href={item.trackViewUrl} className='item-track-title'>{item.trackName}</a><br />
        <a target='_blank' href={item.collectionViewUrl} className='item-collection-title'>{item.collectionName}</a><br />
        <span>Apple Music: {item.isStreamable.toString()}</span><br />
        <a onClick={this.openItunes.bind(this)} href={item.trackViewUrl}>Open on iTunes</a><br />
        <span>
          <audio src={item.previewUrl} controls="true"/>
        </span>
      </div>)
    })
    return (<div className='itunes-item-list item-list row'>
      {results}
    </div>)
  }
}
