const axios = require('axios').default;

const csvParser = require('csv-parse');
const { promisify } = require('util');
const csvParserAsync = promisify(csvParser);

async function downloadLatestCovidRawData() {
    return (await axios.get('https://covid.ourworldindata.org/data/ecdc/full_data.csv')).data;
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
            totalCases,
            totalDeaths
        }

        return accumlator;
    }, {});

    return countriesSummarize;
};

async function run() {
    const rawData = await downloadLatestCovidRawData();
    const latestCovidData = await parseLatestCovidRawData(rawData);
    const dataByCountriesSummarize = await getCovidDataByCountriesSummarize(latestCovidData);

    console.log(dataByCountriesSummarize);
}

run();