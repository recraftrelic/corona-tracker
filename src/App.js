import React, { useEffect, useState } from 'react';
import axios from "axios";
import './normalize.css';
import './skeleton.css';
import './App.css';

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
      <div class="row">
        <div class="six columns"><h5>Total Cases</h5></div>
        <div class="six columns"><h5>{globalData.total_cases}</h5></div>
      </div>
      <div class="row">
        <div class="six columns"><h5>Total Recovered Cases</h5></div>
        <div class="six columns"><h5 className="green">{globalData.total_recovered}</h5></div>
      </div>
      <div class="row">
        <div class="six columns"><h5>New Cases Today</h5></div>
        <div class="six columns"><h5 className="red">{globalData.total_new_cases_today}</h5></div>
      </div>
      <div class="row">
        <div class="six columns"><h5>New Deaths Today</h5></div>
        <div class="six columns"><h5 className="red">{globalData.total_new_deaths_today}</h5></div>
      </div>
      <div class="row">
        <div class="six columns"><h5>Active Cases</h5></div>
        <div class="six columns"><h5 className="red">{globalData.total_active_cases}</h5></div>
      </div>
      <div class="row">
        <div class="six columns"><h5>Total Deaths</h5></div>
        <div class="six columns"><h5 className="red">{globalData.total_deaths}</h5></div>
      </div>
    </div>
  );
}

export default App;
