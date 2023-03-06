import {Component} from 'react'
import Header from '../Header'
import Profile from '../Profile'
import JobsList from '../JobsList'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsRoute extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
  }

  onClickEmploymentId = event => {
    const {employmentType} = this.state
    const employmentId = event.target.value

    // console.log(employmentId)

    if (!employmentType.includes(employmentId)) {
      this.setState(prevState => ({
        employmentType: [...prevState.employmentType, employmentId],
      }))
    } else {
      const filteredEmploymentTypes = employmentType.filter(
        each => each !== employmentId,
      )
      this.setState({employmentType: filteredEmploymentTypes})
    }
  }

  onClickSalary = event => {
    // this.setState({salaryRange: event.target.value})
    selectEmploymentType(event.target.value)
  }

  render() {
    const {employmentType, salaryRange} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="side-container">
            <Profile />

            <hr className="horizontal-line" />
            <div>
              <h1 className="side-text">Type of Employment</h1>
              <ul className="side-subtext">
                {employmentTypesList.map(each => (
                  <li
                    className="list-text"
                    onClick={this.onClickEmploymentId}
                    key={each.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                    />
                    <label
                      htmlFor={each.employmentTypeId}
                      className="label-text"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div>
              <h1 className="side-text">Salary Range</h1>
              <ul className="side-subtext">
                {salaryRangesList.map(each => (
                  <li
                    className="list-text"
                    onClick={this.onClickSalary}
                    key={each.salaryRangeId}
                  >
                    <input
                      type="radio"
                      id={each.salaryRangeId}
                      value={each.salaryRangeId}
                      name="bhagi"
                    />
                    <label htmlFor={each.salaryRangeId} className="label-text">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <JobsList
            employmentTypeArray={employmentType}
            salaryRange={salaryRange}
          />
        </div>
      </>
    )
  }
}
export default JobsRoute
