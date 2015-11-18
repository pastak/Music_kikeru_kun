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
      return (<div className='item amazon-item' key={item.ASIN[0]}>
        <img src={item.MediumImage[0].URL[0]} /><br />
        <a target='_blank' href={item.DetailPageURL[0]} className='item-collection-title'>{item.ItemAttributes[0].Title[0]}</a><br />
      </div>)
    })
    return (<div className='amazon-item-list item-list row'>
      {results}
    </div>)
  }
}
