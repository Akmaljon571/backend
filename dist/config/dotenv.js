"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEK = exports.KEY = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
exports.PORT = PORT;
const SEK = Number(process.env.SEKUND);
exports.SEK = SEK;
const KEY = process.env.SECRET_KEY;
exports.KEY = KEY;
