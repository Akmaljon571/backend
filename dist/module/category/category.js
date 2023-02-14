"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const category_entite_1 = require("./../../entities/category.entite");
const config_1 = require("../../config");
const redis_1 = require("../../config/redis");
const uuid_1 = require("uuid");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const redisTime_1 = __importDefault(require("./redisTime"));
const GET = async (req, res, next) => {
    try {
        const client = await (0, redis_1.fetchRedis)();
        const cache = await client.get("allCategory");
        await (0, redisTime_1.default)();
        if (!cache) {
            const allCategory = await config_1.dataSource.getRepository(category_entite_1.Category).find({
                order: {
                    title: "ASC",
                },
            });
            await client.set("allCategory", JSON.stringify(allCategory));
            res.json({
                message: "Ok",
                status: 200,
                data: allCategory
            });
        }
        else {
            const allCategory = JSON.parse(cache);
            res.json({
                message: "Ok",
                status: 200,
                data: allCategory
            });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.GET = GET;
const POST = async (req, res, next) => {
    try {
        const { title } = req.result;
        const rasm = req.file;
        const client = await (0, redis_1.fetchRedis)();
        const cache = await client.get("allCategory");
        await (0, redisTime_1.default)();
        const newObj = {
            id: (0, uuid_1.v4)(),
            title,
            img: rasm?.filename
        };
        if (!cache) {
            const allCategory = await config_1.dataSource.getRepository(category_entite_1.Category).find();
            await client.set("allCategory", JSON.stringify([...allCategory, newObj]));
            const newCategory = await client.get("newCategory");
            if (newCategory) {
                await client.set("newCategory", JSON.stringify([...JSON.parse(newCategory), newObj]));
            }
            else {
                await client.set("newCategory", JSON.stringify([newObj]));
            }
            res.json({
                message: "Create",
                status: 201,
                dara: newObj
            });
        }
        else {
            const allCategory = JSON.parse(cache);
            await client.set("allCategory", JSON.stringify([...allCategory, newObj]));
            const newCategory = await client.get("newCategory");
            if (newCategory) {
                await client.set("newCategory", JSON.stringify([...JSON.parse(newCategory), newObj]));
            }
            else {
                await client.set("newCategory", JSON.stringify([newObj]));
            }
            res.json({
                message: "Create",
                status: 201,
                dara: newObj
            });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.POST = POST;
const PUT = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const client = await (0, redis_1.fetchRedis)();
        const cache = await client.get("allCategory");
        await (0, redisTime_1.default)();
        if (!cache) {
            const allCategory = await config_1.dataSource.getRepository(category_entite_1.Category).find();
            const findCategory = allCategory.find((e) => e.id == id);
            if (findCategory) {
                if (!title) {
                    res.json({
                        message: "Update",
                        status: 200,
                        data: findCategory
                    });
                }
                const newObj = {
                    id,
                    title: title ?? findCategory.title,
                    img: findCategory.img
                };
                const updateCategory = allCategory.map((e) => e.id == id ? newObj : e);
                await client.set("allCategory", JSON.stringify(updateCategory));
                const updCategory = await client.get("updCategory");
                if (updCategory) {
                    await client.set("updCategory", JSON.stringify([...JSON.parse(updCategory), newObj]));
                }
                else {
                    await client.set("updCategory", JSON.stringify([newObj]));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: findCategory
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            const allCategory = JSON.parse(cache);
            const findCategory = allCategory.find((e) => e.id == id);
            if (findCategory) {
                if (!title) {
                    res.json({
                        message: "Update",
                        status: 200,
                        data: findCategory
                    });
                }
                const newObj = {
                    id,
                    title: title ?? findCategory.title,
                    img: findCategory.img
                };
                const updateCategory = allCategory.map((e) => e.id == id ? newObj : e);
                await client.set("allCategory", JSON.stringify(updateCategory));
                const updCategory = await client.get("updCategory");
                if (updCategory) {
                    await client.set("updCategory", JSON.stringify([...JSON.parse(updCategory), newObj]));
                }
                else {
                    await client.set("updCategory", JSON.stringify([newObj]));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: findCategory
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
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
        const { id } = req.params;
        const client = await (0, redis_1.fetchRedis)();
        const cache = await client.get("allCategory");
        await (0, redisTime_1.default)();
        if (!cache) {
            const allCategory = await config_1.dataSource.getRepository(category_entite_1.Category).find();
            const findCategory = allCategory.find((e) => e.id == id);
            if (findCategory) {
                const deleteCategory = allCategory.filter((e) => e.id != id);
                await client.set("allCategory", JSON.stringify(deleteCategory));
                const delCategory = await client.get("delCategory");
                if (delCategory) {
                    await client.set("delCategory", JSON.stringify([...JSON.parse(delCategory), findCategory]));
                }
                else {
                    await client.set("delCategory", JSON.stringify([findCategory]));
                }
                res.json({
                    message: "Delete",
                    status: 204,
                    data: findCategory
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            const allCategory = await config_1.dataSource.getRepository(category_entite_1.Category).find();
            const findCategory = allCategory.find((e) => e.id == id);
            if (findCategory) {
                const deleteCategory = allCategory.filter((e) => e.id != id);
                await client.set("allCategory", JSON.stringify(deleteCategory));
                const delCategory = await client.get("delCategory");
                if (delCategory) {
                    await client.set("delCategory", JSON.stringify([...JSON.parse(delCategory), findCategory]));
                }
                else {
                    await client.set("delCategory", JSON.stringify([findCategory]));
                }
                res.json({
                    message: "Delete",
                    status: 204,
                    data: findCategory
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.DELETE = DELETE;
