const core = require('../core/core');
const limestresser = require("mineflayer");

function nameCreate(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function createBot(name) {
  const stressBot = limestresser.createBot({
    host: settings.host,
    username: name,
    port: settings.port,
    version: settings.version,
  })

  stressBot.once("login", function () {
    console.log(`[+] ${stressBot.username}, ${settings.host}:${settings.port} giriş yaptı.`);
  });

  stressBot.on("kicked", console.log);
  stressBot.on("error", console.log);

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
        } else if(type == "disconnect") {
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
  if(size == "all" || isNaN(size)) {
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