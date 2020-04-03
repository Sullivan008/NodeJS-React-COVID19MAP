import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { covidDataByCountriesSummarizeJson } from './api';

function App() {
  const [covidDataByCountriesSummarize, setData] = useState(null);
  
  useEffect(() => {
    covidDataByCountriesSummarizeJson().then(covidDataByCountriesSummarize => {
      setData(covidDataByCountriesSummarize);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          { covidDataByCountriesSummarize && 
            Object.values(covidDataByCountriesSummarize).map(({location, totalCases}) =>
              <div>{location}: {totalCases}</div>)}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
