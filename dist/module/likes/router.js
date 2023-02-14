"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const likes_1 = require("./likes");
const validate_1 = require("./validate");
exports.default = (0, express_1.Router)()
    .get("/", verifyToken_1.default, likes_1.GET) // user
    .post("/create", (0, validation_1.default)(validate_1.createLikes), verifyToken_1.default, likes_1.POST) // user
    .delete("/delete/:id", verifyToken_1.default, likes_1.DELETE); // user
