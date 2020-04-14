const express = require('express');
const cors = require('cors');

const {
    getCovidMapPlaceDatas,
    getTotalConfirmedValue,
    getConfirmedRows,
    getTotalDeathsValue,
    getDeathRows,
    getDeathRowById,
    getTotalRecoveredValue,
    getRecoveredRows,
    getRecoveredRowById
} = require('./components/data-services');

const {
    updateCovidData
} = require('./components/data-management');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/update-covid-data', async (req, res) => {
    const serviceResponse = await updateCovidData();

    res.json({
        success: serviceResponse
    });
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

app.get('/get-death-row-by-id', async (req, res) => {
    const deathRow = await getDeathRowById(req.query.rowId);

    res.json(deathRow);
});

app.get('/get-total-recovered-value', async (req, res) => {
    const totalRecoveredValue = await getTotalRecoveredValue();

    res.json(totalRecoveredValue);
});

app.get('/get-recovered-rows', async (req, res) => {
    const recoveredRows = await getRecoveredRows();

    res.json(recoveredRows);
});

app.get('/get-recovered-row-by-id', async (req, res) => {
    const recoveredRow = await getRecoveredRowById(req.query.rowId);

    res.json(recoveredRow);
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});