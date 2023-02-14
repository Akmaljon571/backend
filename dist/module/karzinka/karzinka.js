"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = exports.GET = void 0;
const config_1 = require("../../config");
const karzinka_entite_1 = require("../../entities/karzinka.entite");
const user_entite_1 = require("../../entities/user.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const GET = async (req, res, next) => {
    try {
        const { userId } = req;
        const allKarzinka = await config_1.dataSource
            .getRepository(user_entite_1.Users)
            .findOne({
            relations: {
                karzinka: {
                    product: {
                        likes: true
                    }
                }
            },
            where: {
                id: userId
            }
        });
        res.json({
            message: "Ok",
            status: 200,
            data: allKarzinka?.karzinka,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.GET = GET;
const POST = async (req, res, next) => {
    try {
        const { productId } = req.result;
        const { userId } = req;
        if (!productId && !userId) {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
        const newObj = await config_1.dataSource
            .getRepository(karzinka_entite_1.Karzinka)
            .createQueryBuilder()
            .insert()
            .into("karzinka")
            .values({ product: productId, user: userId })
            .returning("*")
            .execute();
        res.json({
            message: "Create",
            status: 200,
            data: newObj.raw[0],
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.POST = POST;
const DELETE = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allBazaKarzinka = await config_1.dataSource
            .getRepository(karzinka_entite_1.Karzinka)
            .find();
        const find = allBazaKarzinka.find((e) => e.id == id);
        if (find) {
            await config_1.dataSource
                .getRepository(karzinka_entite_1.Karzinka)
                .createQueryBuilder()
                .delete()
                .from("karzinka")
                .where("id = :id", { id })
                .execute();
            res.json({
                message: "Create",
                status: 200,
                data: find,
            });
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
exports.DELETE = DELETE;
