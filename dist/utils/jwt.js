"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const sign = (payload) => {
    if (config_1.KEY)
        return jsonwebtoken_1.default.sign(payload, config_1.KEY);
};
exports.sign = sign;
const verify = (token) => {
    if (config_1.KEY) {
        console.log(token, config_1.KEY);
        return jsonwebtoken_1.default.verify(token, config_1.KEY, (err, data) => {
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new ErrorHandle_1.default('Invalid Token', 400);
            }
            return data;
        });
    }
};
exports.verify = verify;
