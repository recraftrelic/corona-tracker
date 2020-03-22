import React, { useEffect, useState } from 'react';
import axios from "axios";
import './normalize.css';
import './skeleton.css';
import './App.css';
import RecordDetails from './components/RecordDetails';

function App() {

  const [globalData, setGlobalData] = useState({})

  const getAndSetGlobalData = () => {
    axios("https://thevirustracker.com/free-api?global=stats")
      .then(response => {
        setGlobalData(response.data.results[0])
      })
  }

  useEffect(() => {
    getAndSetGlobalData()
  }, [])

  return (
    <div class="container">
      <h1>Global records</h1>
      <RecordDetails
        record={globalData}
      />
    </div>
  );
}

export default App;
