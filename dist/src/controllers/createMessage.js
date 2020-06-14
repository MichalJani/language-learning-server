"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messenger = void 0;
class Messenger {
    constructor(port) {
        this.port = port;
    }
    messagePrint() {
        return `Server is running on port ${this.port}`;
    }
}
exports.Messenger = Messenger;
//# sourceMappingURL=createMessage.js.map