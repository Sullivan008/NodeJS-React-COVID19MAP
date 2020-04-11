const express = require('express');
const cors = require('cors');

const {
    getCovidMapPlaceDatas,
    getTotalConfirmedValue,
    getConfirmedRows,
    getTotalDeathsValue,
    getDeathRows,
    getTotalRecoveredValue,
    getRecoveredRows
} = require('./components/data-services');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/get-covid-map-place-datas', async (req, res) => {
    const covidMapPlaceDatas = await getCovidMapPlaceDatas();

    res.json(covidMapPlaceDatas);
});

app.get('/get-total-confirmed-value', async (req, res) => {
    const totalConfirmed = await getTotalConfirmedValue();

    res.json(totalConfirmed);
});

app.get('/get-confirmed-rows', async (req, res) => {
    const confirmedRows = await getConfirmedRows();

    res.json(confirmedRows);
});

app.get('/get-total-deaths-value', async (req, res) => {
    const totalDeathsValue = await getTotalDeathsValue();

    res.json(totalDeathsValue);
});

app.get('/get-death-rows', async (req, res) => {
    const deathRows = await getDeathRows();

    res.json(deathRows);
});

app.get('/get-total-recovered-value', async (req, res) => {
    const totalRecoveredValue = await getTotalRecoveredValue();

    res.json(totalRecoveredValue);
});

app.get('/get-recovered-rows', async (req, res) => {
    const recoveredRows = await getRecoveredRows();

    res.json(recoveredRows);
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});