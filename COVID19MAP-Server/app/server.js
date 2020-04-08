const express = require('express');
const cors = require('cors');

const {
    getCovidDataFromJsonFile,
    updateCovidData
} = require('./data-management');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/get-covid-data', async (req, res) => {
    const jsonCovidData = await getCovidDataFromJsonFile();

    res.json(jsonCovidData);
});

app.get('/update-covid-data', async (req, res) => {
    await updateCovidData();

    res.json({
        success: true
    });
});

app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
});