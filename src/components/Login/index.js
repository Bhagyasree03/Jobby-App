import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onLoginSuccess = event => {
    const {history} = this.props
    console.log(history)
    console.log(event)
    history.replace('/')
    Cookies.set('token', event, {expires: 30})
  }

  login = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showError: true})
    }
  }

  onChangeUsername = event => {
    // console.log(event.target)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={this.login}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="title-logo"
          />
          <div className="input-container">
            <label className="user-label" htmlFor="userId">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              className="input-box"
              id="userId"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label className="user-label" htmlFor="passwordId">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onChangePassword}
              className="input-box"
              id="passwordId"
              type="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-text">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
