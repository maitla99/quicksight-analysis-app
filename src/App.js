import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/AnalysisSummaryList")
      .then((response) => response.json())
      .then((data) => {
        setDataList(data);
      });
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleBackup = () => {
    fetch("http://localhost:3000/AnalysisSummaryList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dataList }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Backup success:", data));
  };

  return (
    <div>
      <h1>My App</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {dataList &&
          dataList.map((data, index) => <li key={index}>{data.Name}</li>)}
      </ul>
      <button onClick={handleBackup}>Backup</button>
    </div>
  );
}

export default App;
