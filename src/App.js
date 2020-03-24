import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactLoading from 'react-loading';
import RecordDetails from './components/RecordDetails';
import { countries } from './constants';

import './normalize.css';
import './skeleton.css';
import './App.css';

function App() {

  const [record, setRecord] = useState({})
  const [region, setRegion] = useState("world")
  const [loading, setLoading] = useState(true)
  const [newsItems, setNewsItems] = useState([])

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
      { region !== "world" ? <h3>News</h3> : null }
      {
        newsItems.map(
          (news, index) => (
            <div key={index} className="row">
              <div className="two columns">
                <img className="u-max-full-width" src={news.image} />
              </div>
              <div className="ten columns">
                <h5 dangerouslySetInnerHTML={{__html: news.title}}></h5>
              </div>
            </div>
          )
        )
      }
    </div>
  );
}

export default App;
