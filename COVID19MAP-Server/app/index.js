const CronJob = require('cron').CronJob;

const { updateCovidData } = require('./data-management');

const job = new CronJob('0 */1 * * *', async () => {
    await updateCovidData();

    console.log("Data was updated successfully!");
});

job.start();

require('./server');