const workers = global.workers = [];
const { Worker } = require('worker_threads');

for(let i = 0; i < 3; i++) {
    let worker = new Worker('./main.js');
    workers.push(worker);
    console.log(`[${i}] Worker`);
}