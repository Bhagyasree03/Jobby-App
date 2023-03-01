import {Component} from 'react'
import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'
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
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.initial})
    const url = 'https://apis.ccbp.in/jobs'
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
      console.log(updatedData)
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
              <img
                alt="company-logo"
                className="company-logo"
                src={each.companyLogo}
              />
              <h1 className="employment-type">{each.employmentType}</h1>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return this.renderSuccess()
  }
}
export default JobsList
