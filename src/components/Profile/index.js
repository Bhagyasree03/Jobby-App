import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    name: '',
    image: '',
    bio: '',
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        name: data.profile_details.name,
        image: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {name, image, bio} = this.state
    console.log(name, bio, image)
    return (
      <div className="profile-card">
        <img className="profile-image" src={image} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    )
  }

  retryButton = () => {
    this.getProfile()
  }

  renderFailure = () => (
    <div className="profile-failure-card">
      <button
        type="button"
        className="failure-button"
        onClick={this.retryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container loader-card" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      // case initial:

      case apiStatusConstants.success:
        return this.renderSuccess()

      case apiStatusConstants.inProgress:
        return this.renderLoading()

      case apiStatusConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }
}
export default Profile
