import {Component} from 'react'
import Cookies from 'js-cookie'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import {AiFillStar, AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsList extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobs: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}`
    const jwtToken = Cookies.get('token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogo: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        package: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      //   console.log(updatedData)
      this.setState({apiStatus: apiStatusConstants.success, jobs: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {jobs} = this.state
    return (
      <ul className="jobs-list-container">
        {jobs.map(each => (
          <li className="job-list-items" key={each.id}>
            <div className="job-card-container">
              <div className="jobs-logo-container">
                <img
                  alt="company-logo"
                  className="company-logo"
                  src={each.companyLogo}
                />
                <div className="title-container">
                  <h1 className="title">{each.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="star-color" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-container">
                <div className="part-container">
                  <GoLocation className="icon-color" />
                  <p className="location-text">{each.location}</p>
                  <BsBriefcase className="icon-color" />
                  <p className="employment-type-text">{each.employmentType}</p>
                </div>
                <p className="package-text">{each.package}</p>
              </div>
              <div>
                <hr className="line" />
                <p className="description-text">Description</p>
              </div>
              <p className="jobDescription">{each.jobDescription}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  retryButton = () => {
    this.getJobsList()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-jobs-btn"
        onClick={this.retryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container jobs-loader-card" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsList()
  }

  onClickEnter = () => {
    this.getJobsList()
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="search-jobs-container">
        <div className="input-search-container">
          <input
            value={searchInput}
            onChange={this.onChangeSearchInput}
            className="search-text"
            placeholder="search"
            type="search"
            onKeyDown={this.onClickEnter}
          />
          <AiOutlineSearch
            className="search-icon"
            onClick={this.onClickSearchIcon}
          />
        </div>

        {this.renderJobsList()}
      </div>
    )
  }
}
export default JobsList
