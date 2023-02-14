"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./category/router"));
const router_2 = __importDefault(require("./users/router"));
const router_3 = __importDefault(require("./karzinka/router"));
const router_4 = __importDefault(require("./likes/router"));
const router_5 = __importDefault(require("./product/router"));
const router_6 = __importDefault(require("./comment/router"));
exports.default = (0, express_1.Router)()
    .use('/category', router_1.default)
    .use('/karzinka', router_3.default)
    .use('/likes', router_4.default)
    .use('/product', router_5.default)
    .use('/auth', router_2.default)
    .use("/comment", router_6.default);
