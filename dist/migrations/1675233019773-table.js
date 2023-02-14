"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675233019773 = void 0;
class table1675233019773 {
    name = 'table1675233019773';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "userImage" character varying NOT NULL DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userImage"`);
    }
}
exports.table1675233019773 = table1675233019773;
