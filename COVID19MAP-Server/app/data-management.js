const path = require('path');
const fileStream = require('fs');

const axios = require('axios').default;

const moment = require('moment');
const csvParser = require('csv-parse');

const { promisify } = require('util');
const csvParserAsync = promisify(csvParser);
const writeFileAsync = promisify(fileStream.writeFile);
const readFileAsync = promisify(fileStream.readFile);

const DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{date}.csv';
const DOWNLOAD_FULL_PATH = path.join(__dirname, '..', 'downloads', 'full_data.json');

async function downloadLatestCovidRawData() {
    const supplementedUrl = DATA_URL.replace('{date}', moment().subtract(1, 'days').format('MM-DD-YYYY'));

    return (await axios.get(supplementedUrl)).data;
};

async function parseCovidRawData(latestCovidRawData) {
    return await csvParserAsync(latestCovidRawData, {
        delimiter: ','
    });
};

async function convertingCovidDataToJsonFromArrayData(arrayData) {
    const jsonCovidData = 
        arrayData
            .slice(1)
            .reduce((
                accumlator, [
                    fips,
                    admin2,
                    province,
                    country,
                    lastUpdate,
                    latitude,
                    longitude,
                    confirmed,
                    deaths,
                    recovered,
                    active,
                    combinedKey
                ]
            ) => {
                const id = province + '-' + country;

                if(accumlator[id]) {
                    accumlator[id] = {
                        ...accumlator[id],
                        confirmed: accumlator[id].confirmed + parseInt(confirmed),
                        deaths: accumlator[id].deaths + parseInt(deaths),
                        recovered: accumlator[id].recovered + parseInt(recovered)
                    }
                }
                else {
                    accumlator[id] = {
                        id,
                        province,
                        country,
                        lastUpdate,
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        confirmed: parseInt(confirmed),
                        deaths: parseInt(deaths),
                        recovered: parseInt(recovered)
                    };
                }

                return accumlator;
            }, 
        {});

    return jsonCovidData;
};

async function saveCovidDataInJsonFile(downloadedData) {
    await writeFileAsync(DOWNLOAD_FULL_PATH, JSON.stringify(downloadedData));

    return true;
}

async function getCovidDataFromJsonFile() {
    const rawData = await readFileAsync(DOWNLOAD_FULL_PATH);
    return JSON.parse(rawData);
}

async function updateCovidData() {
    const rawData = await downloadLatestCovidRawData();
    const arrayCovidData = await parseCovidRawData(rawData);
    const jsonCovidData = await convertingCovidDataToJsonFromArrayData(arrayCovidData);

    await saveCovidDataInJsonFile(jsonCovidData);

    return true;
}

module.exports = {
    getCovidDataFromJsonFile,
    updateCovidData
}