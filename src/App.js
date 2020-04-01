import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactLoading from 'react-loading';
import RecordDetails from './components/RecordDetails';
import Recharts from './components/Recharts';
import { countries } from './constants';

import './normalize.css';
import './skeleton.css';
import './App.css';

function App() {

  const [record, setRecord] = useState({})
  const [region, setRegion] = useState("world")
  const [loading, setLoading] = useState(true)
  const [newsItems, setNewsItems] = useState([])
  const [charts, setCharts] = useState({})

  const getAndSetGlobalData = () => {
    axios("https://thevirustracker.com/free-api?global=stats")
      .then(response => {
        setLoading(false)
        setRecord({
          ...response.data.results[0],
          info: {
            title: "World"
          }
        })
      })
      .catch(() => setLoading(false))
  }

  const myChartData = () => {
    axios(`https://thevirustracker.com/free-api?countryTimeline=${region}`)
      .then(response => {
        setLoading(false)
        setCharts(response.data.timelineitems[0])
        //console.log(response, "response")
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    getAndSetGlobalData()
  }, [])

  useEffect(() => {
    setLoading(true)
    if (region == "world") {
      getAndSetGlobalData()
    } else {
      axios(`https://thevirustracker.com/free-api?countryTotal=${region}`)
        .then(response => {
          setLoading(false)
          setRecord(response.data.countrydata[0])
          // setNewsItems(response.data)

          const news = Object.keys(response.data.countrynewsitems[0])
          .reduce((result, item) => {
            return result.concat(response.data.countrynewsitems[0][item])
          }, [])

          setNewsItems(news.reverse())
        })
        .catch(() => setLoading(false))
        myChartData()
    }
  }, [region])

  if (loading) {
    return (
      <div className="loading-container u-full-width">
        <ReactLoading type="spin" color="#333" />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns">
          <h3>Select country</h3>
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
      <Recharts
        record={charts}
      />
    </div>
  );
}

export default App;
