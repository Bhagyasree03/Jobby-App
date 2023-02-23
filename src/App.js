import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import JobsRoute from './components/JobsRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/jobs" component={JobsRoute} />
  </Switch>
)

export default App
