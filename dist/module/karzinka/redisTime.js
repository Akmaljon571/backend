"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const redis_1 = require("../../config/redis");
const karzinka_entite_1 = require("../../entities/karzinka.entite");
exports.default = async () => {
    const client = await (0, redis_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheCreate = await client.get("allKarzinka");
            const cacheDelete = await client.get("delKarzinka");
            const newKarzinka = JSON.parse(cacheCreate);
            const deleteKarzinka = JSON.parse(cacheDelete);
            if (newKarzinka.length) {
                newKarzinka.map(async (e) => {
                    await config_1.dataSource
                        .getRepository(karzinka_entite_1.Karzinka)
                        .createQueryBuilder()
                        .insert()
                        .into("karzinka")
                        .values({ id: e.id, productId: e.productId, userId: e.userId })
                        .execute();
                });
            }
            if (deleteKarzinka.length) {
                deleteKarzinka.map(async (e) => {
                    await config_1.dataSource
                        .getRepository(karzinka_entite_1.Karzinka)
                        .createQueryBuilder()
                        .delete()
                        .from("karzinka")
                        .where("id = :id", { id: e.id })
                        .execute();
                });
            }
            await client.del("allKarzinka");
            await client.del("newKarzinka");
            await client.del("delKarzinka");
        }, config_1.SEKUND);
    }
};
// allKarzinka
// newKarzinka
// delKarzinka
