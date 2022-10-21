//const settings = global.settings = require('./src/settings/main.settings.json');
const { workerData } = require('worker_threads')
const functions = global.functions = require('./src/functions/functions.js');
const bots = global.bots = [];
const kickedBots = global.kickedBots = [];
const stresser = require('./src/stresser');

new stresser(workerData.namePrefix, workerData.botSize, workerData.botMs, workerData.host, workerData.port, workerData.version);
