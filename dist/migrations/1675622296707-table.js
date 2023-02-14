"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675622296707 = void 0;
class table1675622296707 {
    name = 'table1675622296707';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_38fa6aeda2eca92adbd0a75fe07"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_1ef45447cca6d61db2b5920ab82"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_a116a647ee2e60f76344fecfc2c"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_314680784cc4ba14bf392fbb873"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "categoryIdId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP COLUMN "productIdId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "productIdId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_5ca60e966256da06f361c5154a2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_74e2dd152129bafab4f051ef191" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_36096625e9a713d7b1f8d34eea0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_36096625e9a713d7b1f8d34eea0"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_74e2dd152129bafab4f051ef191"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_5ca60e966256da06f361c5154a2"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "productIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD "productIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "categoryId" TO "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_314680784cc4ba14bf392fbb873" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_a116a647ee2e60f76344fecfc2c" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_1ef45447cca6d61db2b5920ab82" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_38fa6aeda2eca92adbd0a75fe07" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.table1675622296707 = table1675622296707;
