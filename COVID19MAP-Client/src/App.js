import React, { useState, useEffect } from 'react';
import './App.css';
import { getJsonCovidData } from './api';

import CovidMap from './core/map/CovidMap';

function App() {
  const [jsonCovidData, setData] = useState(null);
  
  useEffect(() => {
    getJsonCovidData().then(jsonCovidData => {
      setData(jsonCovidData);
    })
  }, []);

  const totalConfirmed = jsonCovidData ? Math.max(...Object.values(jsonCovidData).map(item => item.confirmed)) : 1;

  const calculateRadius = (calculatingItem) => {
    const min = 50;
    const max = 500;

    const radius = (calculatingItem.confirmed / totalConfirmed) * max;

    return radius < min ? min : radius;
  };

  const places = jsonCovidData ? 
    Object.values(jsonCovidData).map(item => ({
      id: item.id,
      name: item.id,
      latitude: parseInt(item.latitude),
      longitude: parseInt(item.longitude),
      circle: {
        radius: calculateRadius(item),
        options: {
          strokeColor: "#ff0000"
        }},
      text: item.id + "<br>Confirmed " + item.confirmed + "<br>Deaths: " + item.deaths + "<br>Recovered: " + item.recoverd
    })) : []

  return (
    <div className="App">
      <CovidMap
        center = {{lat: 40.64, lng: -73.96}}
        zoom = {1}
        places = {places}
        googleMapURL = "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY"
        loadingElement = {<div style = {{height: '100%'}} />}
        containerElement = {<div style = {{height: '800px'}}/>}
        mapElement = {<div style = {{height: '100%'}}/>}
      />
    </div>
  );
}

export default App;