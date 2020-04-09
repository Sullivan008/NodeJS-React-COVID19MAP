import React, { useState, useEffect } from 'react';
import './App.css';
import { getJsonCovidData } from './api';

import CovidMap from './core/map/CovidMap';

const numberFormat = new Intl.NumberFormat();

const Panel = ({title, subtitle, children}) => (
  <div className="Panel">
    <div className="Panel-Title">{title}</div>
    <div className="Panel-SubTitle">{subtitle}</div>
    <div className="Panel-Scroller">
      <div className="Panel-Body">
        {children}
      </div>
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
  province === country ? country : (province + " " + country).trim();

const calculateRadius = (confirmed, maxConfirmed) => {

  const min = 30;
  const max = 300;

  const radius = (confirmed / maxConfirmed) * max;

  return radius < min ? min : radius;
};
  
function App() {
  const [jsonCovidData, setData] = useState(null);
  
  useEffect(() => {
    getJsonCovidData().then(jsonCovidData => {
      setData(jsonCovidData);
    })
  }, []);

  if(!jsonCovidData) {
    return <div>Loading...</div>
  };
  
  const covidDataObject = Object.values(jsonCovidData);
  const maxConfirmed = Math.max(...covidDataObject.map(item => item.confirmed));



  const places = covidDataObject.map(({id, name, latitude, longitude, country, province, confirmed, deaths, recovered}) => ({
    id: id,
    name: id,
    latitude,
    longitude,
    circle: {
      radius: calculateRadius(confirmed, maxConfirmed),
        options: {
        strokeColor: "#ff0000"
      }},
    text: `${formatPlaceName({country, province})}<br>Confirmed ${confirmed}<br>Deaths: ${deaths}<br>Recovered: ${recovered}`
  }));

  const totalConfirmed = covidDataObject
    .map(item => item.confirmed)
    .reduce((accumlator, value) => accumlator + value, 0);

  const confirmedRows = covidDataObject
    .filter(({confirmed}) => confirmed > 0)
    .sort(({confirmed: aConfirmed}, {confirmed: bConfirmed}) => bConfirmed - aConfirmed)

  const totalDeaths = covidDataObject
    .map(item => item.deaths)
    .reduce((accumlator, value) => accumlator + value, 0);

  const deathRows = covidDataObject
    .filter(({deaths}) => deaths > 0)
    .sort(({deaths: aDeaths}, {deaths: bDeaths}) => bDeaths - aDeaths);

  const totalRecovered = covidDataObject
    .map(item => item.recovered)
    .reduce((accumlator, value) => accumlator + value, 0);

  const recoveredRows = covidDataObject
    .filter(({recovered}) => recovered > 0)
    .sort(({recovered: aRecovered}, {recovered: bRecovered}) => bRecovered - aRecovered)

  return (
    <div className="App">
      <div className="Column Column-Left">
        <Panel title="Total Confirmed" subtitle={totalConfirmed}/>

        <Panel title="Confirmed Cases">
          <List>
            {
              confirmedRows.map(({country, province, confirmed}) => (
                <List.Item>
                  {numberFormat.format(confirmed)} {formatPlaceName({country, province})}
                </List.Item>
              ))
            }
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
        <Panel title="Total Deaths" subtitle={totalDeaths}>
          <List>
            {
              deathRows.map(({country, province, deaths}) => (
                <List.Item>
                  {numberFormat.format(deaths)} deaths<br /> {formatPlaceName({country, province})}
                </List.Item>
              ))
            }
          </List>
        </Panel>
        <Panel title="Total Recovered" subtitle={totalRecovered}>
          <List>
            {
              recoveredRows.map(({country, province, recovered}) => (
                <List.Item>
                  {numberFormat.format(recovered)} recoverd<br /> {formatPlaceName({country, province})}
                </List.Item>
              ))
            }
          </List>
        </Panel>
      </div>
    </div>
  )
}

export default App;