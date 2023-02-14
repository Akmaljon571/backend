"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("./../../config/ormconfig");
const config_1 = require("../../config");
const redis_1 = require("../../config/redis");
const category_entite_1 = require("../../entities/category.entite");
exports.default = async () => {
    const client = await (0, redis_1.fetchRedis)();
    if (typeof config_1.SEKUND === 'number') {
        setTimeout(async () => {
            const cacheCreate = await client.get('newCategory');
            const cacheUpdate = await client.get('updCategory');
            const cacheDelete = await client.get('delCategory');
            const newCategory = JSON.parse(cacheCreate);
            const updateCategory = JSON.parse(cacheUpdate);
            const deleteCategory = JSON.parse(cacheDelete);
            if (newCategory && newCategory.length) {
                console.log(newCategory);
                newCategory.map(async (e) => {
                    await ormconfig_1.dataSource
                        .getRepository(category_entite_1.Category)
                        .createQueryBuilder()
                        .insert()
                        .into('category')
                        .values({ id: e.id, title: e.title, img: e.img })
                        .execute();
                });
            }
            if (updateCategory && updateCategory.length) {
                updateCategory.map(async (e) => {
                    await ormconfig_1.dataSource
                        .getRepository(category_entite_1.Category)
                        .createQueryBuilder()
                        .update()
                        .set({ title: e.title, img: e.img })
                        .where("id = :id", { id: e.id })
                        .execute();
                });
            }
            if (deleteCategory && deleteCategory.length) {
                deleteCategory.map(async (e) => {
                    await ormconfig_1.dataSource
                        .getRepository(category_entite_1.Category)
                        .createQueryBuilder()
                        .delete()
                        .from('category')
                        .where("id = :id", { id: e.id })
                        .execute();
                });
            }
            await client.del('allCategory');
            await client.del('newCategory');
            await client.del('updCategory');
            await client.del('delCategory');
        }, config_1.SEKUND);
    }
};
// allCategory
// newCategory
// updCategory
// delCategory
