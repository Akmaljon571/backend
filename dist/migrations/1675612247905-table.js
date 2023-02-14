"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675612247905 = void 0;
class table1675612247905 {
    name = 'table1675612247905';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "oldPrice" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "oldPrice" SET NOT NULL`);
    }
}
exports.table1675612247905 = table1675612247905;
