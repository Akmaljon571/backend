"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675426253601 = void 0;
class table1675426253601 {
    name = 'table1675426253601';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "oldPrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "oldPrice" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "oldPrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "oldPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
    }
}
exports.table1675426253601 = table1675426253601;
