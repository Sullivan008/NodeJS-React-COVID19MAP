const axios = require('axios');

const csvParser = require('csv-parse');
const { promisify } = require('util');
const csvParserAsync = promisify(csvParser);

async function readCovidCsv() {
    const fileStream = require('fs');

    const rawData = fileStream.readFileSync(__dirname + '/app_data/full_data.csv');

    const output = await csvParserAsync(rawData, {
        delimiter: ',',
        columns: true
    });

    console.log(output);
}

readCovidCsv();