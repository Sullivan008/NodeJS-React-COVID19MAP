import React, { useState, useEffect } from 'react';
import './App.css';
import { getJsonCovidData } from './api';

import CovidMap from './core/map/CovidMap';

const numberFormat = new Intl.NumberFormat();

const Panel = ({title, children}) => (
  <div className="Panel">
    <div className="Panel-Title">{title}</div>
    <div className="Panel-Scroller">
      <div className="Panel-Body">{children}</div>
    </div>
  </div>
);

const List = ({children}) => (
  <div className="List">{children}</div>
);

List.Item = ({children}) => (
  <div className="List-Item">{children}</div>
);

const formatPlaceName = ({province, country}) => 
  province === country ? country : (province + " " + country).trim()

function App() {
  const [jsonCovidData, setData] = useState(null);
  
  useEffect(() => {
    getJsonCovidData().then(jsonCovidData => {
      setData(jsonCovidData);
    })
  }, []);

  
  const calculateRadius = (calculatingItem) => {
    const totalConfirmed = jsonCovidData ? Math.max(...Object.values(jsonCovidData).map(item => item.confirmed)) : 1;

    const min = 50;
    const max = 500;

    const radius = (calculatingItem.confirmed / totalConfirmed) * max;

    return radius < min ? min : radius;
  };

  const places = jsonCovidData ? 
    Object.values(jsonCovidData).map(item => ({
      id: item.id,
      name: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      circle: {
        radius: calculateRadius(item),
        options: {
          strokeColor: "#ff0000"
        }},
      text: `${formatPlaceName(item)}<br>Confirmed ${item.confirmed}<br>Deaths: ${item.deaths}<br>Recovered: ${item.recovered}`
    })) : [];

  const totalConfirmed = jsonCovidData && 
    Object.values(jsonCovidData)
      .map(item => item.confirmed)
      .reduce((accumlator, value) => accumlator + value, 0);

  console.log(jsonCovidData);

  const totalDeaths = jsonCovidData && 
    Object.values(jsonCovidData)
      .map(item => item.deaths)
      .reduce((accumlator, value) => accumlator + value, 0);

  const totalRecovered = jsonCovidData && 
    Object.values(jsonCovidData)
      .map(item => item.recovered)
      .reduce((accumlator, value) => accumlator + value, 0);

  return (
    <div className="App">
      <div className="Column Column-Left">
        <Panel title="Total Confirmed">
          {totalConfirmed || 0}
        </Panel>

        <Panel title="Confirmed Cases">
          <List>
            {jsonCovidData && Object.values(jsonCovidData).map(({country, province, confirmed}) => (
              <List.Item>{numberFormat.format(confirmed)} {formatPlaceName({country, province})}</List.Item>
            ))}
          </List>
        </Panel>
      </div>

      <div className="Column Column-Map">
        <CovidMap
          center = {{lat: 0.25, lng: 26.85}}
          zoom = {2}
          places = {places}
          googleMapURL = "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY"
          loadingElement = {<div style = {{height: `100%`}} />}
          containerElement = {<div style = {{height: `100vh`}}/>}
          mapElement = {<div style = {{height: `100%`}}/>}
        />
      </div>

      <div className="Column Column-Right">
        <Panel title="Total Deaths">
          {totalDeaths} Deaths

          <List>
            {jsonCovidData && Object.values(jsonCovidData).map(({country, province, deaths}) => (
              <List.Item>{numberFormat.format(deaths)} deaths<br /> {formatPlaceName({country, province})}</List.Item>
            ))}
          </List>
        </Panel>
        <Panel title="Total Recovered">
          {totalRecovered} Recovered

          <List>
            {jsonCovidData && Object.values(jsonCovidData).map(({country, province, recovered}) => (
              <List.Item>{numberFormat.format(recovered)} recoverd<br /> {formatPlaceName({country, province})}</List.Item>
            ))}
          </List>
        </Panel>
      </div>
    </div>
  )
}

export default App;