"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCHTOKEN = exports.SEARCH = exports.IMG = exports.BY_CATEGORYTOKEN = exports.BY_CATEGORY = exports.One = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.Main = void 0;
const uuid_1 = require("uuid");
const config_1 = require("../../config");
const redis_1 = require("../../config/redis");
const category_entite_1 = require("../../entities/category.entite");
const product_entite_1 = require("../../entities/product.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const redisTime_1 = __importDefault(require("./redisTime"));
const Main = async (req, res, next) => {
    try {
        const select = req.query.select ?? 16;
        const pagination = req.query.pagination ?? 1;
        const { userId } = req;
        await (0, redisTime_1.default)();
        const allBazaProduct = await config_1.dataSource
            .getRepository(product_entite_1.Product)
            .find({
            order: {
                date: "DESC",
            },
            relations: {
                likes: {
                    user: true
                },
                karzinka: {
                    user: true
                }
            }
        });
        for (const j in allBazaProduct) {
            for (const i in allBazaProduct[j].likes) {
                if (allBazaProduct[j].likes[i]?.user?.id === userId) {
                    delete allBazaProduct[j].likes[i].id;
                }
            }
        }
        for (const j in allBazaProduct) {
            for (const i in allBazaProduct[j].karzinka) {
                if (allBazaProduct[j].karzinka[i]?.user?.id === userId) {
                    delete allBazaProduct[j].karzinka[i].id;
                }
            }
        }
        res.json({
            message: "OK",
            status: 200,
            data: allBazaProduct.slice((Number(pagination) - 1) * 16, Number(select) * Number(pagination)),
            pagination: Math.ceil(allBazaProduct.length / Number(select)),
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.Main = Main;
const GET = async (req, res, next) => {
    try {
        const select = req.query.select ?? 16;
        const pagination = req.query.pagination ?? 1;
        await (0, redisTime_1.default)();
        const allBazaProduct = await config_1.dataSource
            .getRepository(product_entite_1.Product)
            .find({
            order: {
                date: "DESC",
            },
            relations: {
                likes: true,
                karzinka: true
            }
        });
        res.json({
            message: "OK",
            status: 200,
            data: allBazaProduct.slice((Number(pagination) - 1) * 16, Number(select) * Number(pagination)),
            pagination: Math.ceil(allBazaProduct.length / Number(select)),
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
        const client = await (0, redis_1.fetchRedis)();
        const { title, price, oldPrice, summ, categoryId } = req.result;
        const rasmlar = req.files;
        await (0, redisTime_1.default)();
        if (title && price && summ && categoryId && rasmlar) {
            const allCache = await client.get("allProduct");
            const newObj = {
                id: (0, uuid_1.v4)(),
                title,
                price,
                oldPrice,
                summ,
                category: categoryId,
                img1: rasmlar[0].filename,
                img2: rasmlar[1].filename,
                img3: rasmlar[2].filename,
                img4: rasmlar[3].filename,
                img5: rasmlar[4].filename,
                img6: rasmlar[5].filename,
            };
            if (!allCache) {
                const allBazaProduct = await config_1.dataSource
                    .getRepository(product_entite_1.Product)
                    .find();
                allBazaProduct.push(newObj);
                await client.set("allProduct", JSON.stringify(allBazaProduct));
                const newProduct = await client.get("newProduct");
                if (newProduct) {
                    await client.set("newProduct", JSON.stringify([...JSON.parse(newProduct), newObj]));
                }
                else {
                    await client.set("newProduct", JSON.stringify([newObj]));
                }
                res.json({
                    message: "Create",
                    status: 201,
                    data: newObj,
                });
            }
            else {
                await client.set("allProduct", JSON.stringify([...JSON.parse(allCache), newObj]));
                const newProduct = await client.get("newProduct");
                if (newProduct) {
                    await client.set("newProduct", JSON.stringify([...JSON.parse(newProduct), newObj]));
                }
                else {
                    await client.set("newProduct", JSON.stringify([newObj]));
                }
                res.json({
                    message: "Create",
                    status: 201,
                    data: newObj,
                });
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
exports.POST = POST;
const PUT = async (req, res, next) => {
    try {
        const { title, price, oldPrice, summ, categoryId } = req.result;
        const { id } = req.params;
        const client = await (0, redis_1.fetchRedis)();
        const allCache = await client.get("allProduct");
        await (0, redisTime_1.default)();
        if (!allCache) {
            const allBazaProduct = await config_1.dataSource.getRepository(product_entite_1.Product).find();
            const findProduct = allBazaProduct.find((e) => e.id == id);
            if (findProduct) {
                const updateProduct = {
                    id,
                    title: title || findProduct.title,
                    price: price ?? findProduct.price,
                    oldPrice: oldPrice ?? findProduct.oldPrice,
                    summ: summ ?? findProduct.summ,
                    category: categoryId ?? findProduct.category,
                    img1: findProduct.img1,
                    img2: findProduct.img2,
                    img3: findProduct.img3,
                    img4: findProduct.img4,
                    img5: findProduct.img5,
                    img6: findProduct.img6,
                };
                const newProducts = allBazaProduct.map((e) => e.id == id ? updateProduct : e);
                await client.set("allProduct", JSON.stringify(newProducts));
                const updProduct = await client.get("updProduct");
                if (updProduct) {
                    await client.set("updProduct", JSON.stringify([...JSON.parse(updProduct), updateProduct]));
                }
                else {
                    await client.set("updProduct", JSON.stringify([updateProduct]));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: updateProduct,
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            const allCacheProduct = JSON.parse(allCache);
            const findProduct = allCacheProduct.find((e) => e.id == id);
            if (findProduct) {
                const updateProduct = {
                    id,
                    title: title || findProduct.title,
                    price: price ?? findProduct.price,
                    oldPrice: oldPrice ?? findProduct.oldPrice,
                    summ: summ ?? findProduct.summ,
                    category: categoryId ?? findProduct.category,
                    img1: findProduct.img1,
                    img2: findProduct.img2,
                    img3: findProduct.img3,
                    img4: findProduct.img4,
                    img5: findProduct.img5,
                    img6: findProduct.img6,
                };
                const newProducts = allCacheProduct.map((e) => e.id == id ? updateProduct : e);
                await client.set("allProduct", JSON.stringify(newProducts));
                const updProduct = await client.get("updProduct");
                if (updProduct) {
                    await client.set("updProduct", JSON.stringify([...JSON.parse(updProduct), updateProduct]));
                }
                else {
                    await client.set("updProduct", JSON.stringify([updateProduct]));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: updateProduct,
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
        const cache = await client.get("allProduct");
        await (0, redisTime_1.default)();
        if (!cache) {
            const allBazaProduct = await config_1.dataSource
                .getRepository(product_entite_1.Product)
                .find();
            const findProduct = allBazaProduct.find((e) => e.id == id);
            if (findProduct) {
                const deleteBazaProduct = allBazaProduct.filter((e) => e.id != id);
                await client.set("allProduct", JSON.stringify(deleteBazaProduct));
                const delProduct = await client.get("delProduct");
                if (delProduct) {
                    await client.set("delProduct", JSON.stringify([...JSON.parse(delProduct), findProduct]));
                }
                else {
                    await client.set("delProduct", JSON.stringify([findProduct]));
                }
                res.json({
                    message: "Delete",
                    status: 204,
                    data: findProduct,
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            const allCacheProduct = JSON.parse(cache);
            const findProduct = allCacheProduct.find((e) => e.id == id);
            if (findProduct) {
                const deleteBazaProduct = allCacheProduct.filter((e) => e.id != id);
                await client.set("allProduct", JSON.stringify(deleteBazaProduct));
                const delProduct = await client.get("delProduct");
                if (delProduct) {
                    await client.set("delProduct", JSON.stringify([...JSON.parse(delProduct), findProduct]));
                }
                else {
                    await client.set("delProduct", JSON.stringify([findProduct]));
                }
                res.json({
                    message: "Delete",
                    status: 204,
                    data: findProduct,
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
const One = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req;
        const findBazaProduct = await config_1.dataSource
            .getRepository(product_entite_1.Product)
            .findOne({
            relations: {
                likes: {
                    user: true
                },
                karzinka: {
                    user: true
                }
            },
            where: {
                id
            }
        });
        if (findBazaProduct) {
            for (const i in findBazaProduct.likes) {
                if (findBazaProduct.likes[i]?.user?.id === userId) {
                    findBazaProduct.likes[i].active = true;
                }
                else {
                    findBazaProduct.likes[i].active = false;
                }
            }
            for (const i in findBazaProduct.karzinka) {
                if (findBazaProduct.karzinka[i]?.user?.id === userId) {
                    findBazaProduct.karzinka[i].active = true;
                }
                else {
                    findBazaProduct.karzinka[i].active = false;
                }
            }
            res.json({
                message: "Ok",
                status: 200,
                data: findBazaProduct,
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
exports.One = One;
const BY_CATEGORY = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId;
        const select = req.query.select || 16;
        const pagination = req.query.pagination == String(0) ? 1 : req.query.pagination;
        if (categoryId) {
            const allBazaProduct = await config_1.dataSource
                .getRepository(category_entite_1.Category)
                .findOne({
                relations: {
                    product: {
                        likes: true,
                        karzinka: true
                    }
                },
                where: {
                    id: String(categoryId)
                },
                order: {
                    title: "ASC",
                }
            });
            if (!allBazaProduct?.product) {
                throw new ErrorHandle_1.default("Bad Request", 400);
            }
            res.json({
                message: "OK",
                status: 200,
                categoryId,
                data: allBazaProduct.product.slice((Number(pagination) - 1) * 16, Number(select) * Number(pagination)),
                pagination: Math.ceil(allBazaProduct.product.length / Number(select)),
            });
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
exports.BY_CATEGORY = BY_CATEGORY;
const BY_CATEGORYTOKEN = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId;
        const select = req.query.select || 16;
        const pagination = req.query.pagination == String(0) ? 1 : req.query.pagination;
        const { userId } = req;
        if (categoryId) {
            const allBazaProduct = await config_1.dataSource
                .getRepository(category_entite_1.Category)
                .findOne({
                relations: {
                    product: {
                        likes: {
                            user: true
                        },
                        karzinka: {
                            user: true
                        }
                    }
                },
                where: {
                    id: String(categoryId)
                },
                order: {
                    product: {
                        date: "DESC"
                    }
                }
            });
            if (!allBazaProduct?.product) {
                throw new ErrorHandle_1.default("Bad Request", 400);
            }
            for (const j in allBazaProduct.product) {
                for (const i in allBazaProduct.product[j]?.likes) {
                    if (allBazaProduct.product[j]?.likes[i]?.user?.id === userId) {
                        delete allBazaProduct.product[j]?.likes[i]?.id;
                    }
                }
            }
            for (const j in allBazaProduct.product) {
                for (const i in allBazaProduct.product[j]?.karzinka) {
                    if (allBazaProduct.product[j]?.karzinka[i]?.user?.id === userId) {
                        delete allBazaProduct.product[j]?.karzinka[i]?.id;
                    }
                }
            }
            res.json({
                message: "OK",
                status: 200,
                categoryId,
                data: allBazaProduct.product.slice((Number(pagination) - 1) * 16, Number(select) * Number(pagination)),
                pagination: Math.ceil(allBazaProduct.product.length / Number(select)),
            });
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
exports.BY_CATEGORYTOKEN = BY_CATEGORYTOKEN;
const IMG = async (req, res, next) => {
    try {
        const rasmlar = req.files;
        const { id } = req.params;
        const client = await (0, redis_1.fetchRedis)();
        const allCache = await client.get("allProduct");
        if (!rasmlar?.length) {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
        if (!allCache) {
            const allBazaProduct = await config_1.dataSource.getRepository(product_entite_1.Product).find();
            const findProduct = allBazaProduct.find((e) => e.id == id);
            if (findProduct) {
                const updateProduct = {
                    id,
                    title: findProduct.title,
                    price: findProduct.price,
                    oldPrice: findProduct.oldPrice,
                    summ: findProduct.summ,
                    category: findProduct.category,
                    img1: rasmlar[0]?.filename ?? findProduct.img1,
                    img2: rasmlar[1]?.filename ?? findProduct.img2,
                    img3: rasmlar[2]?.filename ?? findProduct.img3,
                    img4: rasmlar[3]?.filename ?? findProduct.img4,
                    img5: rasmlar[4]?.filename ?? findProduct.img5,
                    img6: rasmlar[5]?.filename ?? findProduct.img6,
                };
                const newProducts = allBazaProduct.map((e) => e.id == id ? updateProduct : e);
                await client.set("allProduct", JSON.stringify(newProducts));
                const updProduct = await client.get("updProduct");
                if (updProduct) {
                    await client.set("updProduct", JSON.stringify([...JSON.parse(updProduct), updateProduct]));
                }
                else {
                    await client.set("updProduct", JSON.stringify([updateProduct]));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: updateProduct,
                });
            }
            else {
                throw new ErrorHandle_1.default("Not Found", 404);
            }
        }
        else {
            const allCacheProduct = JSON.parse(allCache);
            const findProduct = allCacheProduct.find((e) => e.id == id);
            if (findProduct) {
                const updateProduct = {};
                const newProducts = allCacheProduct.map((e) => e.id == id ? updateProduct : e);
                await client.set("allProduct", JSON.stringify(newProducts));
                const updProduct = await client.get("updProduct");
                if (updProduct) {
                    await client.set("updProduct", JSON.stringify([...JSON.parse(updProduct), updateProduct]));
                }
                else {
                    await client.set("updProduct", JSON.stringify([updateProduct]));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: updateProduct,
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
exports.IMG = IMG;
const SEARCH = async (req, res, next) => {
    try {
        const { proName } = req.params;
        const allSearch = await config_1.dataSource.getRepository(product_entite_1.Product).find({
            relations: {
                likes: {
                    user: true
                },
                karzinka: true
            }
        });
        const findSearch = allSearch.filter((e) => e.title.includes(proName));
        res.json({
            message: "Ok",
            status: 200,
            data: findSearch
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.SEARCH = SEARCH;
const SEARCHTOKEN = async (req, res, next) => {
    try {
        const { proName } = req.params;
        const { userId } = req;
        const allSearch = await config_1.dataSource.getRepository(product_entite_1.Product).find({
            relations: {
                likes: {
                    user: true
                },
                karzinka: {
                    user: true
                }
            }
        });
        const findSearch = allSearch.filter((e) => e.title.includes(proName));
        for (const j in findSearch) {
            for (const i in findSearch[j].likes) {
                if (findSearch[j].likes[i]?.user?.id === userId) {
                    delete findSearch[j].likes[i].id;
                }
            }
        }
        for (const j in findSearch) {
            for (const i in findSearch[j].karzinka) {
                if (findSearch[j].karzinka[i]?.user?.id === userId) {
                    delete findSearch[j].karzinka[i]?.id;
                }
            }
        }
        res.json({
            message: "Ok",
            status: 200,
            data: findSearch
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.SEARCHTOKEN = SEARCHTOKEN;
