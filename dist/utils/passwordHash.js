"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.hash = void 0;
const crypto_1 = require("crypto");
const crypto_2 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const key = crypto_2.default.randomBytes(32);
const iv = crypto_2.default.randomBytes(16);
const hash = (pass) => {
    let mykey = (0, crypto_1.createCipheriv)(algorithm, Buffer.from(key), iv);
    let mystr = mykey.update(pass, 'utf8', 'hex');
    mystr += mykey.final('hex');
    return mystr;
};
exports.hash = hash;
const decrypt = (hash) => {
    let mykey = (0, crypto_1.createCipheriv)(algorithm, key, iv);
    let mystr = mykey.update(hash, 'hex', 'utf8');
    mystr += mykey.final('utf8');
    return mystr;
};
exports.decrypt = decrypt;
