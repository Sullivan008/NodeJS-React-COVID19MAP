/* global google */
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getJsonCovidData } from '../../api';

import CovidMap from '../CovidMap/CovidMap';
import List from '../List/List';
import Panel from '../Panel/Panel';
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const numberFormat = new Intl.NumberFormat();
const numberFormatting = number => numberFormat.format(number);

const defaultCovidMapCenterCoordinates = { lat: 6.25, lng: 18.85 };
const defaultCovidMapZoomValue = 2;

const calculateCircleRadius = (confirmed) => 
  Math.log(confirmed) * 10000;

const getFormattedPlaceName = ({province, country}) => 
  province === country ? country : (province + " " + country).trim();

function App() {
  const [covidData, setCovidData] = useState(null);
  const [covidMapCenterCoordinates, setCovidMapCenterCoordinates] = useState(defaultCovidMapCenterCoordinates);
  const [covidMapZoomValue, setCovidMapZoomValue] = useState(defaultCovidMapZoomValue);

  useEffect(() => {
    getJsonCovidData().then(jsonCovidData => {

      const covidDataObject = Object.values(jsonCovidData);
    
      const places = 
        covidDataObject
          .filter(({latitude, longitude}) => latitude && longitude)
          .map(({id, latitude, longitude, country, province, confirmed, deaths, recovered}) => ({
            id,
            latitude,
            longitude,
            circle: {
              radius: calculateCircleRadius(confirmed),
                options: {
                strokeColor: "#ff0000"
                }
            },
            markerPosition: {
              lat: latitude,
              lng: longitude
            },
            markerLabelContent: <div>{getFormattedPlaceName({country, province})}<br />Confirmed {confirmed}<br />Deaths: {deaths}<br />Recovered: {recovered}</div>
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

      setCovidData({
        places,
        totalConfirmed,
        confirmedRows,
        totalDeaths,
        deathRows,
        totalRecovered,
        recoveredRows
      });
    })
  }, []);

  const handleListItemOnClickEvent = useCallback(selectedItemId => {
    const changedCovidMapZoomValue = 6;
    const selectedPlace = covidData.places.find(({id}) => id === selectedItemId);

    setCovidMapCenterCoordinates(new google.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude));
    setCovidMapZoomValue(changedCovidMapZoomValue);
  }, [covidData]);


  const handleOnZoomChanged = useCallback((currentCovidMapZoomValue) => {
    setCovidMapZoomValue(currentCovidMapZoomValue);
  }, []);

  if(!covidData) {
    return <LoadingScreen />
  };
  
  const {
    places,
    totalConfirmed,
    confirmedRows,
    totalDeaths,
    deathRows,
    totalRecovered,
    recoveredRows
  } = covidData;

  return (
    <div className="App">
      <div className="Column Column-Left">
        <Panel title="Total Confirmed" subtitle={numberFormatting(totalConfirmed)} containerClass={"Panel-TotalConfirmed"} subtitleStyle={{color: '#DF0F00', fontSize: '36px', lineHeight: 1}}/>

        <Panel title="Confirmed Cases">
          <List>
            {
              confirmedRows.map(({id, country, province, confirmed}) => (
                <List.Item key={id} id={id} onClick={handleListItemOnClickEvent} style={{cursor: 'pointer'}}>
                  <span style={{color: '#DF0F00', fontWeight: 'bold'}}>{numberFormatting(confirmed)}</span> {getFormattedPlaceName({country, province})}
                </List.Item>
              ))
            }
          </List>
        </Panel>
      </div>

      <div className="Column Column-Map">
        <CovidMap
          googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY'}`}
          loadingElement = {<div style = {{height: `100%`}} />}
          containerElement = {<div style = {{height: `100vh`}}/>}
          mapElement = {<div style = {{height: `100%`}}/>}
          zoom = { covidMapZoomValue }
          places = { places }
          center = { covidMapCenterCoordinates }
          onZoomChanged = { handleOnZoomChanged }
        />
      </div>

      <div className="Column Column-Right">
        <Panel title="Total Deaths" subtitle={numberFormatting(totalDeaths)} subtitleStyle={{color: '#DF0F00', fontSize: '36px', lineHeight: 1}}>
          <List>
            {
              deathRows.map(({id, country, province, deaths}) => (
                <List.Item key={id}>
                  <span style={{color: '#DF0F00', fontWeight: 'bold'}}>{numberFormatting(deaths)}</span> <span style={{color: '#DF0F00'}}>deaths</span><br /> {getFormattedPlaceName({country, province})}
                </List.Item>
              ))
            }
          </List>
        </Panel>

        <Panel title="Total Recovered" subtitle={numberFormatting(totalRecovered)} subtitleStyle={{color: '#41A800', fontSize: '36px', lineHeight: 1}}>
          <List>
            {
              recoveredRows.map(({id, country, province, recovered}) => (
                <List.Item key={id}>
                  <span style={{color: '#41A800', fontWeight: 'bold'}}>{numberFormatting(recovered)}</span> <span style={{color: '#41A800'}}>recoverd</span><br /> {getFormattedPlaceName({country, province})}
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