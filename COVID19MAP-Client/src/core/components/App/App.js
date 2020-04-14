/* global google */
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import { getCovidMapPlaceDatas } from '../../api';
import { getTotalConfirmedValue } from '../../api';
import { getConfirmedRows } from '../../api';
import { getTotalDeathsValue } from '../../api';
import { getDeathRows } from '../../api';
import { getTotalRecoveredValue } from '../../api';
import { getRecoveredRows } from '../../api';

import CovidMap from '../CovidMap/CovidMap';
import List from '../List/List';
import Panel from '../Panel/Panel';
import LoadingScreen from '../LoadingScreen/LoadingScreen'

const numberFormat = new Intl.NumberFormat();
const numberFormatting = number => numberFormat.format(number);

const defaultCovidMapCenterCoordinates = { lat: 6.25, lng: 18.85 };
const defaultCovidMapZoomValue = 2;

const getFormattedPlaceName = ({province, country}) => 
  province === country ? country : (province + " " + country).trim();

function App() {
  const [covidMapPlaceDatas, setCovidMapPlaceDatas] = useState(null);
  const [totalConfirmedValue, setTotalConfirmedValue] = useState(null);
  const [confirmedRows, setConfirmedRows] = useState(null);
  const [totalDeathsValue, setTotalDeathsValue] = useState(null);
  const [deathRows, setDeathRows] = useState(null);
  const [totalRecoveredValue, setTotalRecoveredValue] = useState(null);
  const [recoveredRows, setRecoveredRows] = useState(null);
  const [covidMapCenterCoordinates, setCovidMapCenterCoordinates] = useState(defaultCovidMapCenterCoordinates);
  const [covidMapZoomValue, setCovidMapZoomValue] = useState(defaultCovidMapZoomValue);

  useEffect(() => {
    getCovidMapPlaceDatas().then(covidMapPlaceDatas => {
      setCovidMapPlaceDatas(Object.values(covidMapPlaceDatas));
    });

    getTotalConfirmedValue().then(totalConfirmedValue => {
      setTotalConfirmedValue(totalConfirmedValue);
    });

    getConfirmedRows().then(confirmedRows => {
      setConfirmedRows(Object.values(confirmedRows));
    });

    getTotalDeathsValue().then(totalDeathsValue => {
      setTotalDeathsValue(totalDeathsValue);
    });

    getDeathRows().then(deathRows => {
      setDeathRows(Object.values(deathRows));
    });

    getTotalRecoveredValue().then(totalRecoveredValue => {
      setTotalRecoveredValue(totalRecoveredValue)
    });

    getRecoveredRows().then(recoveredRows => {
      setRecoveredRows(Object.values(recoveredRows));
    });

  }, []);

  const handleListItemOnClickEvent = useCallback(selectedItemId => {
    const changedCovidMapZoomValue = 6;
    const selectedPlace = covidMapPlaceDatas.find(({id}) => id === selectedItemId);

    setCovidMapCenterCoordinates(new google.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude));
    setCovidMapZoomValue(changedCovidMapZoomValue);
  }, [covidMapPlaceDatas]);

  const handleOnZoomChanged = useCallback((currentCovidMapZoomValue) => {
    setCovidMapZoomValue(currentCovidMapZoomValue);
  }, []);

  if (!covidMapPlaceDatas) {
    return <LoadingScreen loadingClassName = "Loading-Default" />
  };
  
  return (
    <div className = "App">
      <div className = "Column Column-Left">
        <Panel title = "Total Confirmed" 
               subtitle = {!totalConfirmedValue ? <LoadingScreen loadingClassName = "Loading-SubTitle" /> : numberFormatting(totalConfirmedValue)} 
               containerClassName = "Panel-TotalConfirmed"
               externalSubtitleClassName = "TotalConfirmed"/>

        <Panel title = "Confirmed Cases">
          <List>
            {
              !confirmedRows ? <LoadingScreen loadingClassName = "Loading-Default" /> : 
              confirmedRows.map(item => (
                <List.Item key = {item.id} id = {item.id} onClick = {handleListItemOnClickEvent} externalClassName = "List-Item-Clickable">
                  <span className = "ConfirmedCases-Number">{numberFormatting(item.confirmed)}</span> {getFormattedPlaceName(item)}
                </List.Item>
              ))
            }
          </List>
        </Panel>
      </div>

      <div className = "Column Column-Map">
        <CovidMap
          googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY'}`}
          loadingElement = {<div className = "Map-LoadingElement" />}
          containerElement = {<div className = "Map-ContainerElement" />}
          mapElement = {<div className = "Map-MapElement" />}
          zoom = { covidMapZoomValue }
          places = { covidMapPlaceDatas }
          center = { covidMapCenterCoordinates }
          onZoomChanged = { handleOnZoomChanged }
        />
      </div>

      <div className = "Column Column-Right">
        <Panel title = "Total Deaths"
               subtitle = {!totalDeathsValue ? <LoadingScreen loadingClassName = "Loading-SubTitle-WithChildren" /> : numberFormatting(totalDeathsValue)}
               externalSubtitleClassName = "TotalDeaths">
          <List>
            {
              !deathRows ? <LoadingScreen loadingClassName = "Loading-Default" /> : 
              deathRows.map(item => (
                <List.Item key = {item.id}>
                  <span className = "TotalDeaths-Number">{numberFormatting(item.deaths)}</span> <span className = "TotalDeaths-Text">deaths</span><br /> {getFormattedPlaceName(item)}
                </List.Item>
              ))
            }
          </List>
        </Panel>

        <Panel title = "Total Recovered" 
               subtitle = {!totalRecoveredValue ? <LoadingScreen loadingClassName = "Loading-SubTitle-WithChildren" /> : numberFormatting(totalRecoveredValue)}
               externalSubtitleClassName = "TotalRecovered">
          <List>
            {
              !recoveredRows ? <LoadingScreen loadingClassName = "Loading-Default" /> :
              recoveredRows.map(item => (
                <List.Item key={item.id}>
                  <span className = "TotalRecovered-Number">{numberFormatting(item.recovered)}</span> <span className = "TotalRecovered-Text">recoverd</span><br /> {getFormattedPlaceName(item)}
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