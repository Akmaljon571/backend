"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = exports.GET = void 0;
const config_1 = require("../../config");
const likes_entite_1 = require("../../entities/likes.entite");
const user_entite_1 = require("../../entities/user.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const GET = async (req, res, next) => {
    try {
        const { userId } = req;
        const allUserLikes = await config_1.dataSource.getRepository(user_entite_1.Users).findOne({
            relations: {
                likes: {
                    product: {
                        karzinka: {
                            user: true
                        }
                    }
                }
            },
            where: {
                id: userId
            }
        });
        for (const j in allUserLikes?.likes) {
            for (const k in allUserLikes?.likes[j]?.product.karzinka) {
                if (allUserLikes?.likes[j]?.product?.karzinka[k]?.user?.id === userId) {
                    delete allUserLikes?.likes[j]?.product.karzinka[k]?.id;
                }
            }
        }
        res.json({
            message: "Ok",
            status: 200,
            data: allUserLikes?.likes,
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
        const newLikes = await config_1.dataSource
            .getRepository(likes_entite_1.Likes)
            .createQueryBuilder()
            .insert()
            .into("likes")
            .values({ product: productId, user: userId })
            .returning("*")
            .execute();
        res.json({
            message: "Create",
            status: 200,
            data: newLikes.raw[0],
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
        const find = await config_1.dataSource
            .getRepository(likes_entite_1.Likes)
            .findOneBy({ id });
        if (find) {
            await config_1.dataSource
                .getRepository(likes_entite_1.Likes)
                .createQueryBuilder()
                .delete()
                .from("likes")
                .where("id = :id", { id })
                .returning('*')
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
