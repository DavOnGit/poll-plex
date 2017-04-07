import { Component, default as React } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/actions'

class PollList extends Component {
  // static propTypes = {}
  _onSubmit = (e) => {
    e.preventDefault()
    console.log(this.props)
  }
  _fetchPolls = () => {
    // const _actions = [
    //   // actions.toggleLoader(),
    //   actions.fetchPolls()
    // ]
    this.props.dispatch(actions.toggleLoader())
    this.props.dispatch(actions.fetchPolls())
  }
  componentWillMount () {
    this._fetchPolls()
  }
  render () {
    const {loader, polls} = this.props

    const _renderPolls = () => {
      if (loader) {
        return (
          <li>
            <div>{loader}</div>
          </li>
        )
      } else if (polls && polls.length) {
        return polls.map((poll, idx) => (
          <li key={idx}>
            <div>{poll.title}</div>
          </li>
        ))
      } else {
        return (
          <li>
            <div>No polls yet!</div>
          </li>
        )
      }
    }
    // const _polls = polls.map((poll, idx) => (
    //   <li key={idx}><div>{poll.title}</div></li>
    // ))
    return (
      <div>
        <div>
          <form onSubmit={this._onSubmit} >
            <label>New Pool</label>
            <input type='text' placeholder='Pool Name' />
            <button>Submit</button>
          </form>
        </div>
        <div>
          <ul>
            {_renderPolls()}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    loader: state.loader
  }
}

export default connect(
  mapStateToProps
)(PollList)
