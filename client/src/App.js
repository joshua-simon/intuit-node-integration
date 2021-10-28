import { useState, useEffect } from 'react'
import axios from 'axios'
import LandingPage from './pages/LandingPage'
import CompanyInfo from './pages/CompanyInfo'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App =() => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = '/' exact component = {LandingPage}/>
          <Route path = '/companyInfo' exact component = {CompanyInfo}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
