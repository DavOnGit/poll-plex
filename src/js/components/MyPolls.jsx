import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import Loader from 'react-loader'
import { scaleOrdinal, schemeCategory10 } from 'd3-scale'

import starsImg from '../../resources/Stars.gif'

const colors = scaleOrdinal(schemeCategory10).range()

class MyPolls extends Component {
  render () {
    const { polls, auth, isFetching } = this.props

    const userPolls = polls.reduce((arr, poll, idx) => poll.owner === auth.uid ? arr.concat(
      <li key={idx} style={{backgroundColor: colors[idx % 10]}}>
        <Link to={`/poll/${poll.id}`}><h4>{poll.title}</h4></Link>
      </li>
    ) : arr, [])

    return (
      <div className='my-polls'>
        <header className='secondary'>
          <div className='inner'>
            <h1>{auth.name}</h1>
          </div>
        </header>
        <div className='poll-list'>
          <h3 className='text-center'>My Poll List</h3>
          <img src={starsImg} />
          <Loader className='spinner' loaded={!isFetching} length={44} width={4}
            radius={16} opacity={0} trail={84} color='rgb(14,101,228)'>
            <ul className='no-bullet'>
              {userPolls}
            </ul>
          </Loader>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    auth: state.auth,
    isFetching: state.isFetching
  }
}

export default connect(
  mapStateToProps
)(MyPolls)
