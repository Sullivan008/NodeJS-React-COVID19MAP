/* global google */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { getJsonCovidData } from '../../api';

import CovidMap from '../CovidMap/CovidMap';
import List from '../List/List';
import Panel from '../Panel/Panel';
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const centerCoordinates = { lat: 6.25, lng: 18.85 };
const defaultZoomValue = 2;

const numberFormat = new Intl.NumberFormat();

const formatPlaceName = ({province, country}) => 
  province === country ? country : (province + " " + country).trim();

const calculateRadius = (confirmed, maxConfirmed) => 
  Math.log(confirmed) * 8000
  
function App() {
  const [jsonCovidData, setData] = useState(null);
  const [center, setCenter] = useState(centerCoordinates);
  const [zoom, setZoom] = useState(defaultZoomValue);
  const covidMapRef = useRef(null);

  useEffect(() => {
    getJsonCovidData().then(jsonCovidData => {
      setData(jsonCovidData);
    })
  }, []);

  const handleListItemOnClickEvent = useCallback(id => {
    const obj = jsonCovidData[id];
    setCenter(new google.maps.LatLng(obj.latitude, obj.longitude));
    setZoom(6);
  }, [jsonCovidData]);

  const handleOnMapRef = useCallback(ref => {
    covidMapRef.current = ref;
  }, [covidMapRef]);

  const handleOnCenterChanged = useCallback(() => {
    setCenter(covidMapRef.current.getCenter());
  }, [covidMapRef]);

  if(!jsonCovidData) {
    return <LoadingScreen />
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
        <Panel title="Total Confirmed" subtitle={numberFormat.format(totalConfirmed)} containerClass={"Panel-TotalConfirmed"} subtitleStyle={{color: '#DF0F00', fontSize: '36px', lineHeight: 1}}/>

        <Panel title="Confirmed Cases">
          <List>
            {
              confirmedRows.map(({id, country, province, confirmed}) => (
                <List.Item key={id} id={id} onClick={handleListItemOnClickEvent} style={{cursor: 'pointer'}}>
                  <span style={{color: '#DF0F00', fontWeight: 'bold'}}>{numberFormat.format(confirmed)}</span> {formatPlaceName({country, province})}
                </List.Item>
              ))
            }
          </List>
        </Panel>
      </div>

      <div className="Column Column-Map">
        <CovidMap
          zoom = {zoom}
          places = {places}
          googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY'}`}
          loadingElement = {<div style = {{height: `100%`}} />}
          containerElement = {<div style = {{height: `100vh`}}/>}
          mapElement = {<div style = {{height: `100%`}}/>}
          onCenterChanged = {handleOnCenterChanged}
          onMapRef = {handleOnMapRef}
          center = {center}
        />
      </div>

      <div className="Column Column-Right">
        <Panel title="Total Deaths" subtitle={numberFormat.format(totalDeaths)} subtitleStyle={{color: '#DF0F00', fontSize: '36px', lineHeight: 1}}>
          <List>
            {
              deathRows.map(({id, country, province, deaths}) => (
                <List.Item key={id}>
                  <span style={{color: '#DF0F00', fontWeight: 'bold'}}>{numberFormat.format(deaths)}</span> <span style={{color: '#DF0F00'}}>deaths</span><br /> {formatPlaceName({country, province})}
                </List.Item>
              ))
            }
          </List>
        </Panel>

        <Panel title="Total Recovered" subtitle={numberFormat.format(totalRecovered)} subtitleStyle={{color: '#41A800', fontSize: '36px', lineHeight: 1}}>
          <List>
            {
              recoveredRows.map(({id, country, province, recovered}) => (
                <List.Item key={id}>
                  <span style={{color: '#41A800', fontWeight: 'bold'}}>{numberFormat.format(recovered)}</span> <span style={{color: '#41A800'}}>recoverd</span><br /> {formatPlaceName({country, province})}
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