"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const redis_1 = require("../../config/redis");
const product_entite_1 = require("../../entities/product.entite");
exports.default = async () => {
    const client = await (0, redis_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheCreate = await client.get("newProduct");
            const cacheUpdate = await client.get("updProduct");
            const cacheDelete = await client.get("delProduct");
            const newProduct = JSON.parse(cacheCreate);
            const updProduct = JSON.parse(cacheUpdate);
            const delProduct = JSON.parse(cacheDelete);
            if (newProduct && newProduct.length) {
                newProduct.map(async (e) => {
                    await config_1.dataSource
                        .getRepository(product_entite_1.Product)
                        .createQueryBuilder()
                        .insert()
                        .into("product")
                        .values({
                        id: e.id,
                        title: e.title,
                        img1: e.img1,
                        img2: e.img2,
                        img3: e.img3,
                        img4: e.img4,
                        img5: e.img5,
                        img6: e.img6,
                        price: e.price,
                        oldPrice: e.oldPrice || null,
                        summ: e.summ,
                        category: e.category,
                    })
                        .execute();
                });
            }
            if (updProduct && updProduct.length) {
                updProduct.map(async (e) => {
                    await config_1.dataSource
                        .getRepository(product_entite_1.Product)
                        .createQueryBuilder()
                        .update()
                        .set({
                        title: e.id,
                        img1: e.img1,
                        img2: e.img2,
                        img3: e.img3,
                        img4: e.img4,
                        img5: e.img5,
                        img6: e.img6,
                        price: e.price,
                        oldPrice: e.oldPrice,
                        summ: e.summ,
                        category: e.category,
                    })
                        .where("id = :id", { id: e.id })
                        .execute();
                });
            }
            if (delProduct && delProduct.length) {
                delProduct.map(async (e) => {
                    await config_1.dataSource
                        .getRepository(product_entite_1.Product)
                        .createQueryBuilder()
                        .delete()
                        .from("product")
                        .where("id = :id", { id: e.id })
                        .execute();
                });
            }
            await client.del("allProduct");
            await client.del("newProduct");
            await client.del("updProduct");
            await client.del("delProduct");
        }, config_1.SEKUND);
    }
};
// allProduct
// newProduct
// updProduct
// delProduct
