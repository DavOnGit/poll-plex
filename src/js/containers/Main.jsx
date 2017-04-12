import { PropTypes, Component, default as React } from 'react'
import { connect } from 'react-redux'
import IndexLink from 'react-router/lib/IndexLink'

import * as actions from '../actions/actions'

class Main extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  _fetchPolls = () => {
    this.props.dispatch(actions.fetchPolls())
  }

  componentWillMount () {
    this._fetchPolls()
  }

  render () {
    return (
      <div>
        <h1>Poll Plex</h1>
        <div>
          <h4 className='header nav'>
            <span>
              <IndexLink to='/' activeClassName='active'>Home</IndexLink>
            </span>
            <span>
              <IndexLink to='/about'activeClassName='active'>about</IndexLink>
            </span>
          </h4>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default connect()(Main)
