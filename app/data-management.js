const path = require('path');
const fileStream = require('fs');

const axios = require('axios').default;

const csvParser = require('csv-parse');

const { promisify } = require('util');
const csvParserAsync = promisify(csvParser);
const writeFileAsync = promisify(fileStream.writeFile);
const readFileAsync = promisify(fileStream.readFile);

const DATA_URL = 'https://covid.ourworldindata.org/data/ecdc/full_data.csv';
const DOWNLOAD_FULL_PATH = path.join(__dirname, '..', 'downloads', 'full_data.json');

async function downloadLatestCovidRawData() {
    return (await axios.get(DATA_URL)).data;
};

async function parseLatestCovidRawData(latestCovidRawData) {
    return await csvParserAsync(latestCovidRawData, {
        delimiter: ',',
        columns: true
    });
};

async function getCovidDataByCountriesSummarize(latestCovidData) {
    const countriesSummarize = latestCovidData.reduce((
        accumlator, {
            location,
            total_cases: totalCases,
            total_deaths: totalDeaths
        }) => {
        accumlator[location] = {
            location,
            totalCases: parseInt(totalCases),
            totalDeaths: parseInt(totalDeaths)
        }

        return accumlator;
    }, {});

    return countriesSummarize;
};

async function saveDataByCountriesSummarizeAsJson(downloadedData) {
    await writeFileAsync(DOWNLOAD_FULL_PATH, JSON.stringify(downloadedData));

    return true;
}

async function getJsonDataByCountriesSummarizeFromFile(covidJsonData) {
    const rawData = await readFileAsync(DOWNLOAD_FULL_PATH);
    const jsonData = JSON.parse(rawData);

    return jsonData;
}

async function updateCovidDataByCountriesSummarize() {
    const rawData = await downloadLatestCovidRawData();
    const latestCovidData = await parseLatestCovidRawData(rawData)
    const dataByCountriesSummarize = await getCovidDataByCountriesSummarize(latestCovidData);

    await saveDataByCountriesSummarizeAsJson(dataByCountriesSummarize);

    return true;
}

module.exports = {
    getJsonDataByCountriesSummarizeFromFile,
    updateCovidDataByCountriesSummarize
}