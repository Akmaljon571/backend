"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("./../../utils/multer");
const validate_1 = require("./validate");
const express_1 = require("express");
const validation_1 = __importDefault(require("../../middleware/validation"));
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const users_1 = require("./users");
exports.default = (0, express_1.Router)()
    .get("/login", users_1.LOGIN) // login
    .post("/registr", (0, validation_1.default)(validate_1.createUser), users_1.REGISTR) // registr
    .get("/emailLogin/:random", users_1.emailLogin)
    .get("/emailRegistr/:random", users_1.emailRegistr)
    .get("/sendPassword", users_1.passwordEmail)
    .get("/emailPassword/:random", users_1.passwordCode)
    .put("/updatePassword", (0, validation_1.default)(validate_1.newPasswordSchema), users_1.newPassword) // user
    .post("/userImage", multer_1.upload.single("img"), verifyToken_1.default, users_1.IMG) // user
    .put("/update", verifyToken_1.default, (0, validation_1.default)(validate_1.updateUser), users_1.PUT) // user
    .get("/user", verifyToken_1.default, users_1.GET) // user
    .delete("/delete", verifyToken_1.default, users_1.DELETE); // user
