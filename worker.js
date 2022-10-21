const settings = {}
const workers = global.workers = [];
const { Worker } = require('worker_threads');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Worker size: ', workersize => {
    rl.question('Server ip: ', serverip => {
        rl.question('Server port: ', serverport => {
            rl.question('Server version: ', serverversion => {
                rl.question('Bot name prefix: ', botnameprefix => {
                    rl.question('Bot size: ', botsize => {
                        rl.question('Bot join ms: ', botjoinms => {
                            for (let i = 0; i < workersize; i++) {
                                let worker = new Worker('./main.js', {
                                    workerData: {
                                        namePrefix: botnameprefix,
                                        botSize: botsize,
                                        botMs: botjoinms,
                                        host: serverip,
                                        port: serverport,
                                        version: serverversion
                                    }
                                });
                                workers.push(worker);
                            }
                        });
                    });
                });
            });
        });
    });
});
