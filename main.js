const settings = global.settings = require('./src/settings/main.settings.json');
const functions = global.functions = require('./src/functions/functions.js');
const bots = global.bots = [];
const stresser = require('./src/stresser');

new stresser(settings.botSize,settings.namePrefix,settings.botMs);
