"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRedis = void 0;
const ErrorHandle_1 = __importDefault(require("./../error/ErrorHandle"));
const redis_1 = require("redis");
const fetchRedis = async () => {
    const client = (0, redis_1.createClient)();
    try {
        client.on('error', err => { throw new ErrorHandle_1.default('Error in Redis', 422); });
        client.on('connect', () => console.log('Redis Client Connected'));
        await client.connect();
        return client;
    }
    catch (error) {
        console.log(error);
        throw new ErrorHandle_1.default('Error in Redis', 422);
    }
};
exports.fetchRedis = fetchRedis;
// Redis ichiga kiruvchi ozgaruvchilar nomi 
// Category
/*  allCategory
*   newCategory
*   updCategory
*   delCategory
*/
// users
/*  loginUsers   / any
*   regisUsers   / any
*   password     / any
*   newPassword  / finish
*/
// likes
/*  allLikes
*   newLikes
*   delLikes
*/
// Karzinka
/*  allKarzinka
*   newKarzinka
*   delKarzinka
*/
// Product
/*  allProduct
*   newProduct
*   updProduct
*   delProduct
*/
