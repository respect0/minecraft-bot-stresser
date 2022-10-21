const core = require('../core/core');
const limestresser = require("mineflayer");
const ProxyAgent = require('proxy-agent');
const socks = require('socks').SocksClient

function nameCreate(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createBot(name, host, port, version) {
  const stressBot = limestresser.createBot({
    connect: client => {
      socks.createConnection({
        proxy: {
          host: '185.239.138.87',
          port: parseInt(8000),
          type: 5,
          userId: 'pGxaLu',
          password: 'txekzW'
        },
        command: 'connect',
        destination: {
          host: host,
          port: port,
          version: version
        }
      }, (err, info) => {
        if (err) {
          console.log(err)
          return
        }
  
        client.setSocket(info.socket)
        client.emit('connect')
      })
    },
    agent: new ProxyAgent({ protocol: 'socks5:', host: '185.239.138.87', port: 8000, username: 'pGxaLu', password: 'txekzW'}),
    username: name
  });

  stressBot.once("login", function () {
    console.log(`[+] ${name}, ${host}:${port} giriş yaptı.`);
  });

  stressBot.on("kicked", () => {
    createBot(name, host, port, version);
  });
  stressBot.on("error", () => {
    createBot(name, host, port, version);
  });

  stressBot.core = new core();
  stressBot.core.init(1000);

  bots.push(stressBot);
}

function process(type, data) {
  bots.forEach((stressBot) => {
    stressBot.core.query(async () => {
      return new Promise(async (resolve) => {
        if (type == "chat") {
          stressBot.chat(data);
        } else if (type == "disconnect") {
          stressBot.chat("bye! (all)")
          stressBot.quit();
        } else throw 'type is not defined';
        resolve();
      });
    });
  });
  console.log("Process successful.");
}

function disconnect(size) {
  size > bots.length ? size = "all" : size;
  if (size == "all" || isNaN(size)) {
    process("disconnect");
  } else {
    for (let i = 0; i < size; i++) {
      const randomStressBot = bots[Math.floor(Math.random() * bots.length)];
      randomStressBot.chat("bye!")
      randomStressBot.quit();
    }
  }
}



module.exports = { nameCreate, createBot, process, disconnect }