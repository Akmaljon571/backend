"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPasswordSchema = exports.updateUser = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUser = joi_1.default.object({
    fullName: joi_1.default.string().max(100).required(),
    phone: joi_1.default.string().max(13).required(),
    city: joi_1.default.string().max(80).required(),
    email: joi_1.default.string().max(200).required(),
    password: joi_1.default.string().max(10).required()
});
exports.updateUser = joi_1.default.object({
    fullName: joi_1.default.string().max(100),
    phone: joi_1.default.string().max(13),
    city: joi_1.default.string().max(80),
    password: joi_1.default.string().max(10)
});
exports.newPasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string().required(),
    random: joi_1.default.string().max(5).required()
});
