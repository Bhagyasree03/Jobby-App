import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
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
    <button type="button" className="header-btn">
      Logout
    </button>
  </nav>
)
export default Header
