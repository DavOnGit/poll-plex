import { Component, default as React } from 'react'
import { connect } from 'react-redux'

import { startAddPoll } from '../actions/actions'
import dreamImg from '../../resources/dereaming.gif'

class NewPoll extends Component {
  state = {
    title: '',
    options: ''
  }

  _handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    const { title, options } = this.state
    const { dispatch } = this.props

    let optionsArray = options.split(',')
      .map((el) => el.trim().replace(/\s{2,}/gm, ' ').substring(0, 30))
      .filter((el) => el.length > 0)

    if (optionsArray.length > 15) {
      window.alert('Warning: Max Options Overflow\n note that 15 is the max options number')
    } else if (title && optionsArray) {
      const poll = { title, options: {} }
      optionsArray.forEach((el) => { poll.options[el] = 0 })

      dispatch(startAddPoll(poll))
    }
  }

  render () {
    const { isFetching } = this.props
    return (
      <div>
        <header className='secondary'>
          <div className='inner'>
            <h1 className='text-center'>...a new one?</h1>
          </div>
        </header>
        <div className='new-poll'>
          <h3 className='text-center'>New Poll: {this.state.title}</h3>
          <form onSubmit={this._handleSubmit}>
            <div className='row'>
              <div className='small-3 columns'>
                <label htmlFor='title-label'
                  className='text-right middle'>Pool&nbsp;Name
                </label>
              </div>
              <div className='small-9 medium-6 columns float-left'>
                <input
                  id='title-label'
                  name='title'
                  onChange={this._handleInputChange}
                  type='text'
                  minLength='3'
                  maxLength='30'
                  required
                  autoFocus='true'
                  placeholder='your amazing poll title here...' />
                <p className='help-text'>min title length is 3</p>
              </div>
            </div>
            <div className='row'>
              <div className='small-3 columns'>
                <label htmlFor='options-label'
                  className='text-right middle'>Options
                </label>
              </div>
              <div className='small-9 medium-6 columns float-left'>
                <input
                  id='options-label'
                  name='options'
                  onChange={this._handleInputChange}
                  type='text'
                  required
                  placeholder='vote, options, comma, separated!' />
                <p className='help-text'>
                  comma separeted like: white, red, green, blue
                </p>
              </div>
            </div>
            <img src={dreamImg} />
            <button className='button large expanded' disabled={isFetching}>
              {isFetching ? 'Fetching...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching
  }
}

export default connect(
  mapStateToProps
)(NewPoll)
