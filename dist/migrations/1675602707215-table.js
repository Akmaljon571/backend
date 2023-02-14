"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675602707215 = void 0;
class table1675602707215 {
    name = 'table1675602707215';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "categoryId" TO "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "categoryIdId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "categoryIdId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "categoryIdId" TO "categoryId"`);
    }
}
exports.table1675602707215 = table1675602707215;
