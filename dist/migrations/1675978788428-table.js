"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675978788428 = void 0;
class table1675978788428 {
    name = 'table1675978788428';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
    }
}
exports.table1675978788428 = table1675978788428;
