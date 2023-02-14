"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verifyAdmin_1 = __importDefault(require("../../middleware/verifyAdmin"));
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const multer_1 = require("../../utils/multer");
const validate_1 = require("./validate");
exports.default = (0, express_1.Router)()
    .get('/', product_1.GET) //user   Query dan select va paginationni jonatilishi kerak
    .get('/main', verifyToken_1.default, product_1.Main) //user   Query dan select va paginationni jonatilishi kerak
    .post('/create', multer_1.upload.array("rasmlar", 6), verifyAdmin_1.default, (0, validation_1.default)(validate_1.createProduct), product_1.POST) // admin
    .put('/update/:id', verifyAdmin_1.default, (0, validation_1.default)(validate_1.updateProduct), product_1.PUT) //admin
    .put("/update/img/:id", multer_1.upload.array("rasmlar", 6), verifyAdmin_1.default, product_1.IMG) //admin
    .delete('/delete/:id', verifyAdmin_1.default, product_1.DELETE) // admin
    .get('/one/:id', verifyToken_1.default, product_1.One) // user
    .get('/byCategory', product_1.BY_CATEGORY) //user query dan categoryId, select va paginationi jonatilishi kerak 
    .get('/byCategoryToken', verifyToken_1.default, product_1.BY_CATEGORYTOKEN) //user query dan categoryId, select va paginationi jonatilishi kerak
    .get('/search/:proName', product_1.SEARCH) // user
    .get('/search/token/:proName', verifyToken_1.default, product_1.SEARCHTOKEN); // user
