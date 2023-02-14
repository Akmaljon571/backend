"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verifyAdmin_1 = __importDefault(require("../../middleware/verifyAdmin"));
const multer_1 = require("../../utils/multer");
const category_1 = require("./category");
const validate_1 = require("./validate");
exports.default = (0, express_1.Router)()
    .get('/', category_1.GET) //user
    .post('/create', multer_1.upload.single("rasm"), (0, validation_1.default)(validate_1.categoryCreate), verifyAdmin_1.default, category_1.POST) //admin
    .put('/update/:id', (0, validation_1.default)(validate_1.categoryUpdate), verifyAdmin_1.default, category_1.PUT) //admin
    .delete('/delete/:id', verifyAdmin_1.default, category_1.DELETE); //admin
