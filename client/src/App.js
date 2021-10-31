import CompanyInfo from './pages/CompanyInfo'
import Main from './pages/Main'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './styles.css'

const App =() => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = '/' exact component = {Main}/>
          <Route path = '/companyInfo' component = {CompanyInfo}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
