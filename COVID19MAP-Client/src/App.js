import React, { useState, useEffect } from 'react';
import './App.css';
import { covidDataByCountriesSummarizeJson } from './api';
import CovidMap from './core/CovidMap';

const places = [
  {
    id: 1,
    name: "Park Slope",
    latitude: "40.6710729",
    longtitude: "-73.9988001",
    circle: {
      radius: 3000,
      options: {
        strokeColor: "#ff0000"
      }
    }
  },
  {
    id: 2,
    name: "Bushwick",
    latitude: "40.6942861",
    longtitude: "-73.9389312"
  },
  {
    id: 3,
    name: "East New York",
    latitude: "40.6577799",
    longtitude: "-73.9147716"
  }
];

function App() {
  const [covidDataByCountriesSummarize, setData] = useState(null);
  
  useEffect(() => {
    covidDataByCountriesSummarizeJson().then(covidDataByCountriesSummarize => {
      setData(covidDataByCountriesSummarize);
    })
  }, []);

  return (
    <div className="App">
      <CovidMap
        center = {{lat: 40.64, lng: -73.96}}
        zoom = {12}
        places = {places}
        googleMapURL = "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"
        loadingElement = {<div style = {{height: '100%'}} />}
        containerElement = {<div style = {{height: '800px'}}/>}
        mapElement = {<div style = {{height: '100%'}}/>}
      />
    </div>
  );
}

export default App;