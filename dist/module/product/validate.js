"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProduct = joi_1.default.object({
    title: joi_1.default.string().max(65).required(),
    price: joi_1.default.string().required(),
    oldPrice: joi_1.default.string(),
    summ: joi_1.default.valid("sum", "$", "rubl").required(),
    categoryId: joi_1.default.string().required(),
});
exports.updateProduct = joi_1.default.object({
    title: joi_1.default.string().max(65),
    price: joi_1.default.string(),
    oldPrice: joi_1.default.string(),
    summ: joi_1.default.valid("sum", "$", "rubl"),
    categoryId: joi_1.default.string(),
});
