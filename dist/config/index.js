"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEKUND = exports.app = exports.PORT = exports.KEY = exports.dataSource = void 0;
const ormconfig_1 = require("./ormconfig");
Object.defineProperty(exports, "dataSource", { enumerable: true, get: function () { return ormconfig_1.dataSource; } });
const dotenv_1 = require("./dotenv");
Object.defineProperty(exports, "KEY", { enumerable: true, get: function () { return dotenv_1.KEY; } });
Object.defineProperty(exports, "PORT", { enumerable: true, get: function () { return dotenv_1.PORT; } });
const app_1 = require("./app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
let SEKUND;
exports.SEKUND = SEKUND;
(() => {
    if (!dotenv_1.SEK) {
        console.log('.env ichiga resitni SEKUNDini kiriting');
    }
    if (!dotenv_1.KEY) {
        console.log('.env ichiga keyni berin');
    }
    exports.SEKUND = SEKUND = Number(dotenv_1.SEK);
    if (!dotenv_1.PORT) {
        console.log('.env ichiga portni berin');
    }
    if (typeof SEKUND !== "number") {
        console.log('.env ichiga resitni SEKUNDini number holatda kiriting');
    }
})();
