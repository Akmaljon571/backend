"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const config_1 = require("../../config");
const user_entite_1 = require("../../entities/user.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const product_entite_1 = require("../../entities/product.entite");
const comment_entite_1 = require("../../entities/comment.entite");
const GET = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { userId } = req;
        const findComment = await config_1.dataSource.getRepository(product_entite_1.Product).findOne({
            relations: {
                comment: {
                    user: true
                }
            },
            where: {
                id: productId
            },
            order: {
                comment: {
                    date: "DESC"
                }
            }
        });
        if (!findComment) {
            throw new ErrorHandle_1.default("Product Not Found", 400);
        }
        for (const i in findComment.comment) {
            if (findComment.comment[i]?.user?.id === userId) {
                findComment.comment[i].active = true;
            }
            else {
                findComment.comment[i].active = false;
            }
        }
        res.json({
            message: "Ok",
            status: 200,
            data: findComment,
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
        const { productId, comment } = req.result;
        const { userId } = req;
        const findByEmail = await config_1.dataSource
            .getRepository(user_entite_1.Users)
            .findOneBy({ id: userId });
        if (!productId && !findByEmail) {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
        const newObj = await config_1.dataSource
            .getRepository(comment_entite_1.Comment)
            .createQueryBuilder()
            .insert()
            .into("comment")
            .values({ product: productId, user: findByEmail?.id, comment })
            .returning("*")
            .execute();
        res.json({
            message: "Create",
            status: 201,
            data: newObj.raw[0],
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.POST = POST;
const PUT = async (req, res, next) => {
    try {
        const { comment } = req.result;
        const { id } = req.params;
        if (!comment) {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
        const updateObj = await config_1.dataSource
            .getRepository(comment_entite_1.Comment)
            .createQueryBuilder()
            .update()
            .set({ comment })
            .where({ id })
            .returning("*")
            .execute();
        res.json({
            message: "Update",
            status: 200,
            data: updateObj.raw[0],
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.PUT = PUT;
const DELETE = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allBazaComment = await config_1.dataSource
            .getRepository(comment_entite_1.Comment)
            .find();
        const find = allBazaComment.find((e) => e.id == id);
        if (find) {
            await config_1.dataSource
                .getRepository(comment_entite_1.Comment)
                .createQueryBuilder()
                .delete()
                .from("Comment")
                .where("id = :id", { id })
                .execute();
            res.json({
                message: "Delete",
                status: 204,
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
