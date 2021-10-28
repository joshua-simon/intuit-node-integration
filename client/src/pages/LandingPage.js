import react, { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [authUri, setAuthUri] = useState("");

  useEffect(() => {
    axios.get("/authUri")
    .then((res) => setAuthUri(res.data));
  }, []);

  return (
    <div>
      <a href={authUri}>Connect to QuickBooks</a>
    </div>
  );
};

export default LandingPage;
