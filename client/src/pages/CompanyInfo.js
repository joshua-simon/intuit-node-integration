import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CompanyInfo = () => {

    const [ info, setInfo ] = useState('')

    useEffect(() => {
        axios.get('/getCompanyInfo')
        .then(res => setInfo(res.data))
    },[])


    console.log(info.CompanyInfo.CompanyName)
//res.data.CompanyInfo.CompanyName

    return(
        <div>
           <p> {info.CompanyInfo.CompanyName} </p>
        </div>
    )
}

export default CompanyInfo