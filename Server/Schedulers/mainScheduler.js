const cron = require('node-cron');
const cleanVerficationCodes = require('./Jobs/cleanVerificationCodes')



const scheduleJobs = () => {
    cron.schedule('*/30 * * * *', cleanVerficationCodes); // Every 30 minutes Clear the verification codes.
}


module.exports = scheduleJobs