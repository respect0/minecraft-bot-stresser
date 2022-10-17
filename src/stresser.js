const {process, disconnect} = require('./functions/functions')

module.exports = class stresser {
    constructor(botSize, namePrefix, botMs) {
        this.botSize = botSize;
        this.namePrefix = namePrefix;
        this.botMs = botMs
        this.randomCharLength = 6;
        this.number = 0;
        this.start()
        chatMessage();
    }

    start() {
        if (this.number < this.botSize) {
            this.number++;
            setTimeout(() => {
                functions.createBot(this.namePrefix + "_" + functions.nameCreate(this.randomCharLength));
                this.start();
            }, this.botMs)
        }
    }
}

function chatMessage() {
    setInterval(() => {
        functions.process("chat", "craftlime best");
    },1000)
}