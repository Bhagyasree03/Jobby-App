import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const logOut = () => {
    Cookies.remove('token')
    return <Redirect to="/login" />
  }
  return (
    <nav className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
      <ul className="header-list">
        <Link to="/" className="header-link">
          <li className="header-text">Home</li>
        </Link>
        <Link to="/jobs" className="header-link">
          <li className="header-text">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="header-btn" onClick={logOut}>
        Logout
      </button>
    </nav>
  )
}

export default Header
