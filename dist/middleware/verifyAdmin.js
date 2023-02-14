"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("./../config/ormconfig");
const jwt_1 = require("./../utils/jwt");
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const user_entite_1 = require("../entities/user.entite");
exports.default = async (req, res, next) => {
    try {
        const { acces_token } = req.headers;
        if (typeof acces_token === 'string') {
            const userId = (0, jwt_1.verify)(acces_token);
            if (typeof userId === 'string') {
                const user = await ormconfig_1.dataSource.getRepository(user_entite_1.Users).findOneBy({ email: userId });
                if (user?.email === "ahmadjonovakmal079@gmail.com") {
                    req.userId = user.id;
                    next();
                }
                else {
                    throw new ErrorHandle_1.default("Siz Admin emassiz", 400);
                }
            }
            else {
                throw new ErrorHandle_1.default('Not Token', 400);
            }
        }
        else {
            throw new ErrorHandle_1.default('Not Token', 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
