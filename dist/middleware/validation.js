"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
exports.default = (schema) => {
    return (req, res, next) => {
        try {
            const { error, value } = schema.validate(req.body);
            if (error) {
                throw new ErrorHandle_1.default(error.message, 401);
            }
            console.log(req.body);
            req.result = value;
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
};
