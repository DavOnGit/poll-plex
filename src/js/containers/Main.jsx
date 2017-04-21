import { PropTypes, Component, default as React } from 'react'
import { connect } from 'react-redux'
import IndexLink from 'react-router/lib/IndexLink'

import * as actions from '../actions/actions'

// Foundation nav menu toggle point in pixels
const navBreakpoint = 767

class Main extends Component {
  state = {
    showMenu: 'none'
  }

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  fetchPolls = () => {
    this.props.dispatch(actions.fetchPolls())
  }

  handleClickToggleNav = () => {
    const { showMenu } = this.state
    const display = showMenu === 'none' || showMenu === 'flex' ? 'block' : 'none'
    this.setState({ showMenu: display })
  }

  handleUpdate = () => {
    if (window.innerWidth >= navBreakpoint) {
      this.setState({ showMenu: 'flex' })
    }
  }

  handleLogin = (authProvider) => () => {
    this.props.dispatch(actions.startLogin(authProvider))
  }

  handleLogout = () => {
    this.props.dispatch(actions.startLogout())
  }

  componentWillMount () {
    this.fetchPolls()
    if (window.innerWidth >= navBreakpoint) {
      this.setState({ showMenu: 'flex' })
    } else {
      this.setState({ showMenu: 'none' })
    }
  }

  render () {
    const { uid, name, image } = this.props.auth
    return (
      <div>
        <div className='title-bar' data-responsive-toggle='animated-menu' data-hide-for='medium'>
          <button className='menu-icon' onClick={this.handleClickToggleNav} type='button' />
          <div className='title-bar-title'>Poll Plex</div>
          <button className='menu-icon' onClick={this.handleClickToggleNav} type='button' />
        </div>

        <div className='top-bar' id='animated-menu' style={{display: this.state.showMenu}}>
          <div className='top-bar-left'>
            <ul className='dropdown menu show-for-medium' data-dropdown-menu>
              <li className='menu-text'>Poll Plex</li>
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='dropdown menu' data-dropdown-menu>
              <li>
                <IndexLink to='/' activeClassName='nav-active'>Polls</IndexLink>
              </li>
              <li>
                { uid ? <IndexLink to='/mypolls' activeClassName='nav-active'>My Polls</IndexLink> : null }
              </li>
              <li>
                { uid ? <IndexLink to='/newpoll' activeClassName='nav-active'>New Poll</IndexLink> : null }
              </li>
              <li>
                <IndexLink to='/about' activeClassName='nav-active'>About</IndexLink>
              </li>
              { uid === undefined ? (
                <li>
                  <a>Login</a>
                  <ul className='submenu menu vertical'>
                    {/* <li><a onClick={this.handleLogin('google')}>Google</a></li> */}
                    <li><a onClick={this.handleLogin('facebook')}>Facebook</a></li>
                    {/* <li><a onClick={this.handleLogin('github')}>GitHub</a></li> */}
                  </ul>
                </li>
              ) : (
                <li>
                  <a>
                    <div className='media-object align-middle'>
                      <div className='media-object-section'>
                        {name}
                      </div>
                      <div className='media-object-section avatar'
                        style={{ backgroundImage: `url(${image})` }} />
                    </div>
                  </a>
                  <ul className='submenu menu vertical'>
                    <li><a onClick={this.handleLogout}>Logout</a></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
  componentDidMount () {
    window.addEventListener('resize', this.handleUpdate)
    $(document).foundation()    // eslint-disable-line
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleUpdate)
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(Main)
