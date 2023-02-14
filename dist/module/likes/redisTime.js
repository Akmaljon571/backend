"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const redis_1 = require("../../config/redis");
exports.default = async () => {
    const client = await (0, redis_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheCreate = await client.get("newLikes");
            const cacheDelete = await client.get("delLikes");
            const newLikes = JSON.parse(cacheCreate);
            const delLikes = JSON.parse(cacheDelete);
            if (newLikes && newLikes.length) {
                newLikes.map(async (e) => {
                });
            }
            if (delLikes && delLikes.length) {
            }
            await client.del("allLikes");
            await client.del("newLikes");
            await client.get("delLikes");
        }, config_1.SEKUND);
    }
};
// allLikes
// newLikes
// delLikes
