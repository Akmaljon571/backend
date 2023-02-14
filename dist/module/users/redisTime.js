"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTime = void 0;
const redis_1 = require("./../../config/redis");
const emailTime = async () => {
    const client = await (0, redis_1.fetchRedis)();
    setTimeout(async () => {
        const cachePassword = await client.get("password");
        const password = JSON.parse(cachePassword);
        if (password && password.length) {
            const newPassword = password.filter((e) => e.email !== password[0].email);
            await client.set("password", JSON.stringify(newPassword));
        }
    }, 240000);
};
exports.emailTime = emailTime;
// loginUsers
// regisUsers
// password
