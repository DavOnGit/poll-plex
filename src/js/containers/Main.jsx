import { PropTypes, default as React } from 'react'
import { IndexLink } from 'react-router'

const Main = (props) => (
  <div>
    <h1>Hello Redux</h1>
    <div>
      <h4>
        <span>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
        </span>
        <span>
          <IndexLink to="/about" activeClassName="active">about</IndexLink>
        </span>
      </h4>
    </div>
    {props.children}
  </div>
)

Main.propTypes = {
  children: PropTypes.element
}

export default Main
