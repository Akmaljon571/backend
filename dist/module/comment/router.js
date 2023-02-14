"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const comment_1 = require("./comment");
const validate_1 = require("./validate");
exports.default = (0, express_1.Router)()
    .get("/:productId", verifyToken_1.default, comment_1.GET) // user
    .post("/create", verifyToken_1.default, (0, validation_1.default)(validate_1.newComment), comment_1.POST) // user
    .put("/update/:id", verifyToken_1.default, (0, validation_1.default)(validate_1.updateComment), comment_1.PUT) // user
    .delete("/delete/:id", verifyToken_1.default, comment_1.DELETE); // user
