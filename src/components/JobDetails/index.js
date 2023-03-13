import {Component} from 'react'
import Cookies from 'js-cookie'
import {GoLocation, GoLinkExternal} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    companyLife: {},
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    // console.log(match)
    const {params} = match
    const {id} = params
    // console.log(id)

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      //   console.log(updatedData)

      const updatedJobDetails = {
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        employmentType: updatedData.jobDetails.employment_type,
        id: updatedData.jobDetails.id,
        jobDescription: updatedData.jobDetails.job_description,
        lifeAtCompany: updatedData.jobDetails.life_at_company,
        location: updatedData.jobDetails.location,
        salaryPackage: updatedData.jobDetails.package_per_annum,
        rating: updatedData.jobDetails.rating,
        skills: updatedData.jobDetails.skills,
        title: updatedData.jobDetails.title,
      }

      const updatedLifeAtCompany = {
        description: updatedJobDetails.lifeAtCompany.description,
        imageUrl: updatedJobDetails.lifeAtCompany.image_url,
      }

      const updatedSkills = updatedJobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const updatedSimilarJobs = updatedData.similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      //   console.log(updatedJobDetails)
      //   console.log(updatedSimilarJobs)

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        companyLife: updatedLifeAtCompany,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccess = () => {
    const {jobDetails, companyLife, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      salaryPackage,
      title,
      location,
    } = jobDetails

    return (
      <div className="jobs-details-container">
        <div className="job-list-items">
          <div className="job-card-container">
            <div className="jobs-logo-container">
              <img
                alt="company-logo"
                className="company-logo"
                src={companyLogoUrl}
              />
              <div className="title-container">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-color" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-container">
              <div className="part-container">
                <GoLocation className="icon-color" />
                <p className="location-text">{location}</p>
                <BsBriefcase className="icon-color" />
                <p className="employment-type-text">{employmentType}</p>
              </div>
              <p className="package-text">{salaryPackage}</p>
            </div>
            <div>
              <hr className="line" />
              <div>
                <div className="visit-link">
                  <p className="description-text">Description</p>
                  <div className="visit-container">
                    <a
                      href={companyWebsiteUrl}
                      className="visit-text"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                    <GoLinkExternal className="link-icon" />
                  </div>
                </div>
                <p className="jobDescription">{jobDescription}</p>
              </div>
              <div>
                <h1 className="skill-text">Skills</h1>
                <ul className="skill-container">
                  {skills.map(skill => (
                    <li className="skill-list" key={skill.name}>
                      <img
                        src={skill.imageUrl}
                        className="skill-image"
                        alt={skill.name}
                      />
                      <p className="skill-para">{skill.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="skill-text">Life at Company</h1>
                <div className="Company-container">
                  <p className="job-descript">{companyLife.description}</p>
                  <img
                    className="img-company"
                    src={companyLife.imageUrl}
                    alt="company"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-heading">Similar Jobs</h1>
          <div className="similar-container">
            <ul className="list-card">
              {similarJobs.map(sameJob => (
                <li className="similar-list" key={sameJob.id}>
                  <div>
                    <div className="similar-card">
                      <img
                        className="company-logo"
                        src={sameJob.companyLogoUrl}
                        alt="company logo"
                      />
                      <div className="title-container">
                        <h1 className="title">{sameJob.title}</h1>
                        <div className="rating-container">
                          <AiFillStar className="star-color" />
                          <p className="rating">{sameJob.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="description-text">Description</h1>
                      <p className="jobDescription">{sameJob.jobDescription}</p>
                    </div>
                    <div className="part-container">
                      <GoLocation className="icon-color" />
                      <p className="location-text">{sameJob.location}</p>
                      <BsBriefcase className="icon-color" />
                      <p className="employment-type-text">
                        {sameJob.employmentType}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      //   case apiStatusConstants.failure:
      //     return this.renderFailure()
      //   case apiStatusConstants.inProgress:
      //     return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobDetails
