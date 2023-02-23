import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button type="button" className="home-btn">
        Find Jobs
      </button>
    </div>
  </>
)
export default Home
