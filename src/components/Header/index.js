import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('token')
    history.replace('/login')
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
      <ul className="sm-header-list">
        <Link to="/" className="header-link">
          <li>
            <AiFillHome className="sm-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="header-link">
          <li>
            <BsFillBriefcaseFill className="sm-icon" />
          </li>
        </Link>
        <li>
          <button type="button" className="sm-btn" onClick={logOut}>
            <FiLogOut className="sm-icon" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
