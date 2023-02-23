import './index.css'

const Header = () => (
  <nav className="header-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="header-logo"
    />
    <ul className="header-list">
      <li className="header-text">Home</li>
      <li className="header-text">Jobs</li>
    </ul>
    <button type="button" className="header-btn">
      Logout
    </button>
  </nav>
)
export default Header
