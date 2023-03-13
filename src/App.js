import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import JobsRoute from './components/JobsRoute'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
