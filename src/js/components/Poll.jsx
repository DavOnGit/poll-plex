import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import { history } from '../'

import ShareSocial from './ShareSocial'
import { startAddVote, startDeletePoll } from '../actions/actions'

import Chart from './Chart'

class Poll extends Component {
  state = {
    poll: {},
    options: [],
    formValue: '',
    custom: false
  }

  handleChange = (e) => {
    const option = e.target.value
    const custom = option === ' __*Custom_Option*__' ? '' : false
    this.setState({ formValue: option, custom })
  }

  handleChangeCustom = (e) => {
    const custom = e.target.value
    this.setState({ custom })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { poll, formValue } = this.state
    const votes = poll.options[formValue] + 1
    this.props.dispatch(startAddVote(poll.id, formValue, votes))
  }

  handleSubmitCustom = (e) => {
    e.preventDefault()
    const { poll, custom } = this.state
    if (custom.length < 3) {
      window.alert('Too short! Add some more please\n\nMin length is 3')
      return
    }
    if (custom === ' __*Custom_Option*__') {
      window.alert('Please change option name!\n\nThis is a Reserved word.')
      return
    }
    this.props.dispatch(startAddVote(poll.id, custom, 1))
    this.setState({ custom: false })
  }

  handleCloseCustom = () => {
    this.setState({
      custom: false,
      formValue: this.state.options[0].name
    })
  }

  handleCancel = () => {
    const { uid, location } = this.props
    if (window.confirm('Are you sure?\n\nOK will delete this!')) {
      this.props.dispatch(
        startDeletePoll(this.state.poll.id, uid, location.pathname)
      )
    }
  }

  setStateForm = (polls, params) => {
    const poll = polls.filter((poll) => poll.id === params.id)
    console.log('ASDASDASDASD!', poll)
    if (poll.length !== 1) {
      history.push('/not-found-poll')
      return
    }
    const keys = Object.keys(poll[0].options)
    const options = keys.map((key) => {
      return {
        name: key,
        value: poll[0].options[key]
      }
    })
    const formValue = options[0].name
    this.setState({ poll: poll[0], options, formValue })
  }

  componentWillReceiveProps (nextProps) {
    console.log('Poll WillReceiveProps: ', this.props, nextProps)
    const { isFetching } = this.props
    if (isFetching === true && nextProps.isFetching === false) {
      const { polls, params } = nextProps
      this.setStateForm(polls, params)
    }
  }

  componentWillMount () {
    console.log('Poll WillMount: ', this.props)
    if (this.props.isFetching === false) {
      const { polls, params } = this.props
      this.setStateForm(polls, params)
    }
  }

  render () {
    console.log('Poll Rendered')
    const { poll, options, custom } = this.state
    const { uid, isFetching } = this.props

    // ShareSocial props
    const pollPath = `http://www.fakesite.com/poll/${poll.id}`
    const title = `Poll Name: ${poll.title}`
    const image = ''
    const descr = 'Your opinion counts! Vote this poll, ' +
      'no registration required '

    const conditionalRenderForm = () => {
      if (custom === false) {
        return (
          <div className='input-group'>
            <span className='input-group-label radius-left'>
              Vote Now!
            </span>
            {
              isFetching ? (
                <select className='input-group-field'>
                  <option>Fetching awesome data...</option>
                </select>
              ) : (
                <select className='input-group-field'
                  onChange={this.handleChange}>
                  {
                    options.map((el, idx) => (
                      <option value={el.name} key={idx}>
                        {el.name}
                      </option>
                    ))
                  }
                  {
                    uid ? <option value=' __*Custom_Option*__'>
                      Add your custom option...
                    </option>
                    : null
                  }
                </select>
              )
            }
            <div className='input-group-button'>
              <input className='button primary radius-right'
                value='Submit' type='submit' disabled={isFetching} />
            </div>
          </div>
        )
      }
      return (
        <div className='input-group'>
          <div className='input-group-button'>
            <input className='button primary radius-left'
              type='submit'
              value='Submit' />
          </div>
          <input className='input-group-field'
            type='text'
            onChange={this.handleChangeCustom}
            autoFocus='true'
            placeholder='Add your option' />
          <div className='input-group-label radius-right orange'>
            <button className='close-button' type='button'>
              <span onClick={this.handleCloseCustom}
                aria-hidden='true'>
                &times;
              </span>
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className='poll-page'>
        <header className='secondary'>
          <div className='inner'>
            <h1 className='text-center'>Vote & Share</h1>
          </div>
        </header>
        <div className='poll-tab'>
          <h3 className='text-center'>PollName: {poll.title}</h3>
          <div className='row align-middle'>
            <div className='small-12 form-wrapper'>
              <form className='small-12 medium-9 large-6'
                onSubmit={custom !== false
                  ? this.handleSubmitCustom
                  : this.handleSubmit
                }>
                { conditionalRenderForm() }
              </form>
            </div>
            <div className='small-12 large-5 columns table-wrapper'>
              <h4 className='text-center'>Poll details</h4>
              <Loader className='spinner' loaded={!isFetching} length={44} width={4}
                radius={16} opacity={0} trail={84} color='rgb(14,101,228)'>
                <table className='hover text-center'>
                  <thead>
                    <tr>
                      <th className='text-center'>Option</th>
                      <th className='text-center'>Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !isFetching && poll.options ? Object.keys(poll.options).map((key, idx) => (
                        <tr key={idx}>
                          <td>{key}</td>
                          <td>{poll.options[key]}</td>
                        </tr>
                      )) : null
                    }
                  </tbody>
                </table>
              </Loader>
            </div>
            <div className='small-6 large-7 columns chart-wrapper'>
              <Chart options={options} />
            </div>
            <ShareSocial url={pollPath} title={title} image={image} descr={descr} />
            <div className='small-12 delete-btn'>
              { (uid && uid === poll.owner)
                ? <button className='button expanded alert'
                  type='button'
                  onClick={this.handleCancel}
                  disabled={isFetching}>
                  Delete this Poll
                </button>
                : <h3 className='text-center no-delete'>&nbsp;</h3>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.polls,
    uid: state.auth.uid,
    isFetching: state.isFetching
  }
}

export default connect(
  mapStateToProps
)(Poll)
