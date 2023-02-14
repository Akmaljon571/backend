"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const senMail = async (adres, content) => {
    try {
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "karzinkawebsite@gmail.com",
                pass: "jxhpfbsrewpjkcri"
            }
        });
        await transport.sendMail({
            from: "karzinkawebsite@gmail.com",
            to: adres,
            subject: content,
            text: content
        });
        return content;
    }
    catch (error) {
        throw new ErrorHandle_1.default("Email Hatoligi", 400);
    }
};
exports.default = senMail;
