import { useState, useEffect } from "react";
import axios from "axios";

const CompanyInfo = () => {

  const [companyInfo, setCompanyInfo] = useState("");
  const [ loading, setLoading ] = useState(true)


  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  useEffect(() => {
      setLoading(true)
    axios
      .get("/getCompanyInfo", { headers: { Authorization: "Bearer " + token } })
      .then((res) => setCompanyInfo(res));
      setLoading(false)
  }, []);

  const details = {
      name: companyInfo && companyInfo.data &&companyInfo.data.CompanyInfo.CompanyName,
      startDate: companyInfo &&companyInfo.data &&companyInfo.data.CompanyInfo.CompanyStartDate,
      country: companyInfo &&companyInfo.data &&companyInfo.data.CompanyInfo.Country,
      email:companyInfo &&companyInfo.data &&companyInfo.data.CompanyInfo.Email.Address
  }

    const display = loading 
    ?  
    'Loading'
    : 
    <div className="companyInfo">
        <h1>App Info</h1>
        <h2>Name: {details.name}</h2>
        <h2>Start Date: {details.startDate}</h2>
        <h2>Country: {details.country}</h2>
        <h2>Email: {details.email}</h2>
    </div>

  return (
    <>
        {
            display
        }
    </>
  );
};

export default CompanyInfo;
