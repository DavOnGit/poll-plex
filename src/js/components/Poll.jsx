import { Component, default as React } from 'react'
import { connect } from 'react-redux'

class Poll extends Component {
  render () {
    const { polls, params } = this.props
    const thisPoll = polls.filter((poll) => poll.id === params.id)

    return (
      <div style={{'textAlign': 'left'}}>
        Poll id: {params.id}
        <pre>{JSON.stringify(thisPoll[0], '<br>', 4)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls
  }
}

export default connect(
  mapStateToProps
)(Poll)
