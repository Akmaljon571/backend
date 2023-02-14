"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const errorHandle = async (err, req, res, next) => {
    if (err instanceof ErrorHandle_1.default) {
        return res.status(err.status).json({
            message: err.message,
            status: err.status
        });
    }
    console.log(err);
    res.status(500).json({
        message: 'Error in Server',
        status: 500
    });
};
exports.errorHandle = errorHandle;
