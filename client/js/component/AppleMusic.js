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
        <a target='_blank' href={item.trackViewUrl} className='item-track-title'>
          <img src={item.artworkUrl100} /><br />
          {item.trackName}
        </a><br />
        <a target='_blank' href={item.collectionViewUrl} className='item-collection-title'>{item.collectionName}</a><br />
        <a target='_blank' href={item.artistViewUrl}>{item.artistName}</a><br />
        <span>Apple Music: {item.isStreamable
          ? <i className='fa fa-check' style={{color: 'red'}}/>
          : <i className='fa fa-times' style={{color: 'blue'}}/>
        }</span>
        <a className='btn btn-default open-itunes' onClick={this.openItunes.bind(this)} href={item.trackViewUrl}>Open on iTunes</a><br />
        <audio src={item.previewUrl} controls="true"/>
      </div>)
    })
    return (<div className='itunes-item-list item-list row'>
      {results}
    </div>)
  }
}
