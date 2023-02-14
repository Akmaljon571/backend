"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675234016994 = void 0;
class table1675234016994 {
    name = 'table1675234016994';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(10) NOT NULL`);
    }
}
exports.table1675234016994 = table1675234016994;
