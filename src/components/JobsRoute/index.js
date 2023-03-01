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
  render() {
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
                  <li className="list-text" key={each.employmentTypeId}>
                    {each.label}
                  </li>
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div>
              <h1 className="side-text">Salary Range</h1>
              <ul className="side-subtext">
                {salaryRangesList.map(each => (
                  <li className="list-text" key={each.salaryRangeId}>
                    {each.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <JobsList />
        </div>
      </>
    )
  }
}
export default JobsRoute
