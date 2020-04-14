const path = require('path');
const fileStream = require('fs');

const { promisify } = require('util');
const readFileAsync = promisify(fileStream.readFile);

const DOWNLOADED_FILE_FULL_PATH = path.join(__dirname, '../..', 'downloads', 'full_data.json');

const calculateCircleRadius = (confirmed) => 
    Math.log(confirmed) * 10000;

const getFormattedPlaceName = ({province, country}) => 
    province === country ? country : (province + " " + country).trim();

const numberFormat = new Intl.NumberFormat();
const numberFormatting = number => numberFormat.format(number);

async function getCovidMapPlaceDatas() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
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
                    markerLabelContent: `${getFormattedPlaceName({country, province})}<br />Confirmed ${numberFormatting(confirmed)}<br />Deaths: ${numberFormatting(deaths)}<br />Recovered: ${numberFormatting(recovered)}`
                }));
};

async function getTotalConfirmedValue() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .map(item => item.confirmed)
                 .reduce((accumlator, value) => accumlator + value, 0);
};

async function getConfirmedRows() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .filter(({confirmed}) => confirmed > 0)
                 .sort(({confirmed: aConfirmed}, {confirmed: bConfirmed}) => bConfirmed - aConfirmed)
                 .map(({id, province, country, confirmed}) => {
                    return {id, province, country, confirmed};
                });
};

async function getTotalDeathsValue() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .map(item => item.deaths)
                 .reduce((accumlator, value) => accumlator + value, 0);
};

async function getDeathRows() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .filter(({deaths}) => deaths > 0)
                 .sort(({deaths: aDeaths}, {deaths: bDeaths}) => bDeaths - aDeaths)
                 .map(({id, province, country, deaths}) => {
                    return {id, province, country, deaths};
                });
};

async function getDeathRowById(rowId) {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .filter(({id, deaths}) => deaths > 0 && id === rowId)
                 .sort(({deaths: aDeaths}, {deaths: bDeaths}) => bDeaths - aDeaths)
                 .map(({id, province, country, deaths}) => {
                    return {id, province, country, deaths};
                });
};

async function getTotalRecoveredValue() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .map(item => item.recovered)
                 .reduce((accumlator, value) => accumlator + value, 0);
};

async function getRecoveredRows() {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .filter(({recovered}) => recovered > 0)
                 .sort(({recovered: aRecovered}, {recovered: bRecovered}) => bRecovered - aRecovered)
                 .map(({id, province, country, recovered}) => {
                    return {id, province, country, recovered};
                 });
};

async function getRecoveredRowById(rowId) {
    const rawData = await readFileAsync(DOWNLOADED_FILE_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return Object.values(jsonData)
                 .filter(({id, recovered}) => recovered > 0 && id === rowId)
                 .sort(({recovered: aRecovered}, {recovered: bRecovered}) => bRecovered - aRecovered)
                 .map(({id, province, country, recovered}) => {
                    return {id, province, country, recovered};
                });
};

module.exports = {
    getCovidMapPlaceDatas,
    getTotalConfirmedValue,
    getConfirmedRows,
    getTotalDeathsValue,
    getDeathRows,
    getDeathRowById,
    getTotalRecoveredValue,
    getRecoveredRows,
    getRecoveredRowById
};