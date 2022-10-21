module.exports = class stresser {
    constructor(namePrefix, botSize, botMs, host, port, version) {
        this.namePrefix = namePrefix;
        this.botSize = botSize;
        this.botMs = botMs;
        this.host = host;
        this.port = port;
        this.version = version
        this.randomCharLength = 6;
        this.number = 0;
        this.start()
    }

    start() {
        if (this.number < this.botSize) {
            this.number++;
            setTimeout(async () => {
                let name = this.namePrefix + "_" + functions.nameCreate(this.randomCharLength)
                await functions.createBot(name, this.host, this.port, this.version);
                this.start();
            }, this.botMs)
        }
    }
}
