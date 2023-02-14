"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1676224512033 = void 0;
class table1676224512033 {
    name = 'table1676224512033';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "date"`);
    }
}
exports.table1676224512033 = table1676224512033;
