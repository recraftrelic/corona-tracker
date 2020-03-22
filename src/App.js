import React, { useEffect, useState } from 'react';
import axios from "axios";
import './normalize.css';
import './skeleton.css';
import './App.css';
import RecordDetails from './components/RecordDetails';
import { countries } from './constants';

function App() {

  const [record, setRecord] = useState({})
  const [region, setRegion] = useState("world")

  const getAndSetGlobalData = () => {
    axios("https://thevirustracker.com/free-api?global=stats")
      .then(response => {
        setRecord({
          ...response.data.results[0],
          info: {
            title: "World"
          }
        })
      })
  }

  useEffect(() => {
    getAndSetGlobalData()
  }, [])

  useEffect(() => {
    if (region == "world") {
      getAndSetGlobalData()
    } else {
      axios(`https://thevirustracker.com/free-api?countryTotal=${region}`)
        .then(response => setRecord(response.data.countrydata[0]))
    }
  }, [region])

  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns">
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
          >
            <option value="world">World</option>
            {
              countries.map(
                (country, index) => <option key={index} value={country.code}>{country.name}</option>
              )
            }
          </select>
        </div>
      </div>
      <RecordDetails
        record={record}
      />
    </div>
  );
}

export default App;
