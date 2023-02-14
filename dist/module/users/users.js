"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.IMG = exports.DELETE = exports.PUT = exports.newPassword = exports.passwordCode = exports.passwordEmail = exports.emailRegistr = exports.emailLogin = exports.REGISTR = exports.LOGIN = void 0;
const user_entite_1 = require("./../../entities/user.entite");
const redis_1 = require("./../../config/redis");
const config_1 = require("../../config");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const nodemailer_1 = __importDefault(require("../../utils/nodemailer"));
const random_1 = require("../../utils/random");
const jwt_1 = require("../../utils/jwt");
const redisTime_1 = require("./redisTime");
const bcrypt_1 = __importDefault(require("bcrypt"));
const LOGIN = async (req, res, next) => {
    try {
        const { email, password } = req.query;
        const client = await (0, redis_1.fetchRedis)();
        await (0, redisTime_1.emailTime)();
        if (typeof email === "string" && typeof password === "string") {
            const findBazaUser = await config_1.dataSource
                .getRepository(user_entite_1.Users)
                .findOneBy({ email });
            if (findBazaUser) {
                const hash = await bcrypt_1.default.compare(password, findBazaUser.password);
                if (hash) {
                    const mailSendNumber = (0, random_1.random)();
                    await (0, nodemailer_1.default)(email, mailSendNumber);
                    const newObject = {
                        mailSendNumber,
                        email,
                        password: findBazaUser.password
                    };
                    await client.setEx(mailSendNumber, 4400, JSON.stringify([newObject]));
                    res.json({
                        message: "Code send Email",
                        status: 200,
                    });
                }
                else {
                    throw new ErrorHandle_1.default("Password Hato", 400);
                }
            }
            else {
                throw new ErrorHandle_1.default("User Not Found", 404);
            }
        }
        else {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.LOGIN = LOGIN;
const REGISTR = async (req, res, next) => {
    try {
        const { fullName, phone, city, email, password } = req.result;
        const client = await (0, redis_1.fetchRedis)();
        await (0, redisTime_1.emailTime)();
        if (fullName && phone && city && email && password) {
            const findBazaUser = await config_1.dataSource
                .getRepository(user_entite_1.Users)
                .findOneBy({ email });
            if (!findBazaUser) {
                const mailSendNumber = (0, random_1.random)();
                await (0, nodemailer_1.default)(email, mailSendNumber);
                const solt = await bcrypt_1.default.genSalt();
                const pass = await bcrypt_1.default.hash(password, solt);
                const newObject = {
                    mailSendNumber,
                    email,
                    password: pass,
                    fullName,
                    phone,
                    city,
                };
                await client.setEx(mailSendNumber, 4400, JSON.stringify([newObject]));
                res.json({
                    message: "Code send Email",
                    status: 200,
                });
            }
            else {
                throw new ErrorHandle_1.default("User Already Exists", 409);
            }
        }
        else {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.REGISTR = REGISTR;
const emailLogin = async (req, res, next) => {
    try {
        const client = await (0, redis_1.fetchRedis)();
        const { random } = req.params;
        const cacheLogin = await client.get(random);
        if (cacheLogin) {
            const newUser = JSON.parse(cacheLogin);
            const findUser = newUser.find((e) => e.mailSendNumber == random);
            if (findUser) {
                res.status(201).json({
                    bearer_token: (0, jwt_1.sign)(findUser?.email),
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            throw new ErrorHandle_1.default("Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.emailLogin = emailLogin;
const emailRegistr = async (req, res, next) => {
    try {
        const client = await (0, redis_1.fetchRedis)();
        const { random } = req.params;
        const cacheLogin = await client.get(random);
        if (cacheLogin) {
            const newUser = JSON.parse(cacheLogin);
            const findUser = newUser.find((e) => e.mailSendNumber == random);
            if (findUser) {
                await config_1.dataSource
                    .getRepository(user_entite_1.Users)
                    .createQueryBuilder()
                    .insert()
                    .into("users")
                    .values({
                    fullName: findUser.fullName,
                    phoneNumber: findUser.phone,
                    city: findUser.city,
                    email: findUser.email,
                    password: findUser.password,
                })
                    .execute();
                res.status(201).json({
                    bearer_token: (0, jwt_1.sign)(findUser?.email),
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            throw new ErrorHandle_1.default("Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.emailRegistr = emailRegistr;
const passwordEmail = async (req, res, next) => {
    try {
        const { email } = req.query;
        const client = await (0, redis_1.fetchRedis)();
        await (0, redisTime_1.emailTime)();
        if (typeof email !== "string")
            throw new ErrorHandle_1.default("Bad Request", 401);
        const randomUser = (0, random_1.random)();
        await (0, nodemailer_1.default)(email, randomUser);
        const obj = {
            email,
            randomUser,
        };
        await client.setEx(randomUser, 4400, JSON.stringify(obj));
        res.json({
            message: "Code send Email",
            status: 200,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.passwordEmail = passwordEmail;
const passwordCode = async (req, res, next) => {
    try {
        const { random } = req.params;
        const client = await (0, redis_1.fetchRedis)();
        const cache = await client.get(random);
        if (cache) {
            const allCache = JSON.parse(cache);
            const obj = {
                email: allCache.email,
                randomUser: random,
            };
            await client.setEx(random, 4400, JSON.stringify(obj));
            res.json({
                message: "Ok",
                status: 200,
            });
        }
        else {
            throw new ErrorHandle_1.default("User Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.passwordCode = passwordCode;
const newPassword = async (req, res, next) => {
    try {
        const { newPassword, random } = req.result;
        const client = await (0, redis_1.fetchRedis)();
        if (random && newPassword) {
            const cache = await client.get(random);
            if (!cache)
                throw new ErrorHandle_1.default("Bad Request", 401);
            const allCache = JSON.parse(cache);
            const solt = await bcrypt_1.default.genSalt();
            const password = await bcrypt_1.default.hash(newPassword, solt);
            await config_1.dataSource
                .getRepository(user_entite_1.Users)
                .createQueryBuilder()
                .update()
                .set({ password })
                .where({ email: allCache.email })
                .returning("*")
                .execute();
            res.json({
                message: "Update User Password",
                status: 200
            });
        }
        else {
            throw new ErrorHandle_1.default("Surin bottan", 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.newPassword = newPassword;
const PUT = async (req, res, next) => {
    try {
        const { fullName, phone, city, password } = req.result;
        const { userId } = req;
        const findUser = await config_1.dataSource
            .getRepository(user_entite_1.Users)
            .findOneBy({ id: userId });
        if (findUser) {
            let pass = '';
            if (password) {
                const solt = await bcrypt_1.default.genSalt();
                pass = await bcrypt_1.default.hash(password, solt);
            }
            const updateUser = await config_1.dataSource
                .getRepository(user_entite_1.Users)
                .createQueryBuilder()
                .update()
                .set({
                fullName: fullName ?? findUser.fullName,
                phoneNumber: phone ?? findUser.phoneNumber,
                city: city ?? findUser.city,
                password: pass ?? findUser.password
            })
                .where("id = :id", { id: findUser.id })
                .execute();
            res.json({
                message: "Update",
                status: 200,
                data: updateUser.raw,
            });
        }
        else {
            throw new ErrorHandle_1.default("User Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.PUT = PUT;
const DELETE = async (req, res, next) => {
    try {
        const { userId } = req;
        await config_1.dataSource
            .getRepository(user_entite_1.Users)
            .createQueryBuilder()
            .update()
            .set({ deleteUser: false })
            .where({ id: userId })
            .execute();
        res.json({
            message: "Delete",
            status: 204,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.DELETE = DELETE;
const IMG = async (req, res, next) => {
    try {
        const { userId } = req;
        const rasm = req.file;
        console.log(rasm);
        await config_1.dataSource
            .getRepository(user_entite_1.Users)
            .createQueryBuilder()
            .update()
            .set({ userImage: String(rasm?.filename) })
            .where({ id: userId })
            .execute();
        res.json({
            message: "Ok",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.IMG = IMG;
const GET = async (req, res, next) => {
    try {
        const { userId } = req;
        const findUser = await config_1.dataSource
            .getRepository(user_entite_1.Users)
            .findOne({
            relations: {
                likes: true,
                karzinka: true
            },
            where: {
                id: userId
            }
        });
        res.json({
            message: "OK",
            status: 200,
            data: findUser,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.GET = GET;
