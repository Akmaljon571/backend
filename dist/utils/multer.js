"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const url = path_1.default.join(process.cwd(), 'src', '/uploads');
        cb(null, url);
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
