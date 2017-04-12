import { Component, PropTypes, default as React } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

class PollList extends Component {
  static propTypes = {
    polls: PropTypes.array.isRequired,
    loader: PropTypes.string.isRequired
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props)
  }

  _handlePollClick = (e) => {
    e.stopPropagation()
    console.log(e.target.dataset.id)
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
            <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
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

    return (
      <div>
        <div>
          <form onSubmit={this._handleSubmit} >
            <label>New Pool</label>
            <input type='text' placeholder='Pool Name' />
            <button>Submit</button>
          </form>
        </div>
        <div>
          <ul onClick={this._handlePollClick}>
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
