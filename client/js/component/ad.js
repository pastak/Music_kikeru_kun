const React = require('react')
const ReactDOM = require('react-dom')

export default class extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render () {
      return (<div className='ad'>
        <ins className='adsbygoogle'
           style={{display:'block'}}
           data-ad-client='ca-pub-4787283240527546'
           data-ad-slot='6939564609'
           data-ad-format='auto'>
        </ins>
      </div>)
  }
}
