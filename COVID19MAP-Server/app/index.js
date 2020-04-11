const CronJob = require('cron').CronJob;

const { updateCovidData } = require('./components/data-management');

const job = new CronJob('0 */1 * * *', async () => {
    const serviceResponse = await updateCovidData();

    if(serviceResponse){
        console.log("\nData was updated successfully!");
    } else {
        console.log("\nData update failed! Please check more information server console log!");
    }
});

job.start();

require('./server');