import { useState, useEffect } from 'react'
import axios from 'axios'
import LandingPage from './pages/LandingPage'

const App =() => {

  useEffect(() => {
    axios.get('/getCompanyInfo')
    .then(res =>res.json())
    .then(data => console.log(data))
  },[])

  return (
    <div>
      <LandingPage/>
    </div>
  )
}

export default App;
