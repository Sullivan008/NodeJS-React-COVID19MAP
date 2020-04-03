const express = require('express');
const cors = require('cors');

const {
    getJsonDataByCountriesSummarizeFromFile,
    updateCovidDataByCountriesSummarize
} = require('./data-management');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/get-covid-data-by-countries-summarize', async (req, res) => {
    const covidDataByCountriesSummarize = await getJsonDataByCountriesSummarizeFromFile();

    res.json(covidDataByCountriesSummarize);
});

app.get('/update-covid-data-by-countries-summarize', async (req, res) => {
    await updateCovidDataByCountriesSummarize();

    res.json({
        success: true
    });
});

app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});