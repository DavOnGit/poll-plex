import { Component, PropTypes, default as React } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import Loader from 'react-loader'
import tabletImg from '../../resources/Tablet.gif'
import { scaleOrdinal, schemeCategory10 } from 'd3-scale'

const colors = scaleOrdinal(schemeCategory10).range()

class PollList extends Component {
  static propTypes = {
    polls: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render () {
    const {isFetching, polls} = this.props
    const _renderPolls = () => {
      if (polls && polls.length) {
        return polls.map((poll, idx) => (
          <li key={idx} style={{backgroundColor: colors[idx % 10]}}>
            <Link to={`/poll/${poll.id}`}><h4>{poll.title}</h4></Link>
          </li>
        ))
      } else {
        return <li><p className='lead'>No polls yet! Be the first!</p></li>
      }
    }

    return (
      <div className='poll-list'>
        <h3 className='text-center'>Poll List</h3>
        <img src={tabletImg} />
        <h4 className='subheader text-center'>
          {isFetching ? 'Fetching polls...' : 'Have a look on users polls:'}
        </h4>

        <ul className='no-bullet'>
          <Loader className='spinner' loaded={!isFetching} length={44} width={4}
            radius={16} opacity={0} trail={84} color='rgb(14,101,228)'>
            {_renderPolls()}
          </Loader>
        </ul>
        <p className='text-center'>
          <small>We're like Change.org exept we changeed nothing, yet!</small>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    isFetching: state.isFetching
  }
}

export default connect(
  mapStateToProps
)(PollList)
