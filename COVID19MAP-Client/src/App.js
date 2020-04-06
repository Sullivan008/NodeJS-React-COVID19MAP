import React, { useState, useEffect } from 'react';
import './App.css';
import { covidDataByCountriesSummarizeJson } from './api';

import CovidMap from './core/CovidMap';
import Geocode from 'react-geocode';

Geocode.setApiKey("YOUR_API_GOOGLE_API_KEY");
Geocode.setLanguage("en");
Geocode.setRegion("us");
Geocode.enableDebug();

function App() {
  const [covidDataByCountriesSummarize, setData] = useState(null);

  const coordinatesCache = JSON.parse(window.localStorage.getItem('coordinatesCache') || '{}');
  
  useEffect(() => {
    covidDataByCountriesSummarizeJson().then(covidDataByCountriesSummarize => {
      const promises = Object.values(covidDataByCountriesSummarize).map(({location}) => {
        if(coordinatesCache[location]) {
          return covidDataByCountriesSummarize[location].coordinates = coordinatesCache[location];
        }
          
        return Geocode.fromAddress(location).then(response => {
          const {lat, lng} = response.results[0].geometry.location;

          covidDataByCountriesSummarize[location].coordinates = {lat, lng};

          coordinatesCache[location] = {lat, lng};

          window.localStorage.setItem('coordinatesCache', JSON.stringify(coordsCache));
        });
      });

      Promise.all(promises).then(() => {
        setData(covidDataByCountriesSummarize);
      });
    })
  }, []);

  const places = covidDataByCountriesSummarize ? 
    Object.values(covidDataByCountriesSummarize).map(item => ({
      id: item.location,
      name: item.location,
      latitude: item.coords.lat,
      longitude: item.coords.lng,
      circle: {
        radius: 3000,
        options: {
          strokeColor: "#ff0000"
        }}
    })) : []

  return (
    <div className="App">
      <CovidMap
        center = {{lat: 40.64, lng: -73.96}}
        zoom = {12}
        places = {places}
        googleMapURL = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_GOOGLE_API_KEY"
        loadingElement = {<div style = {{height: '100%'}} />}
        containerElement = {<div style = {{height: '800px'}}/>}
        mapElement = {<div style = {{height: '100%'}}/>}
      />
    </div>
  );
}

export default App;