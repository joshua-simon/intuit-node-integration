import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
    
  const [authUri, setAuthUri] = useState("");

  useEffect(() => {
    axios.get("/authUri").then((res) => setAuthUri(res.data));
  }, []);

  return (
    <div>
      <p>
        <a href={authUri}>Connect to Quickbooks</a>
      </p>
    </div>
  );
};

export default Main;