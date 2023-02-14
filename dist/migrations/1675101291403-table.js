"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675101291403 = void 0;
class table1675101291403 {
    name = 'table1675101291403';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(65) NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(65) NOT NULL, "img1" character varying NOT NULL, "img2" character varying NOT NULL, "img3" character varying NOT NULL, "img4" character varying NOT NULL, "img5" character varying NOT NULL, "img6" character varying NOT NULL, "price" integer NOT NULL, "oldPrice" integer NOT NULL, "summ" character varying NOT NULL, "categoryIdId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(100) NOT NULL, "phoneNumber" character varying(13) NOT NULL, "city" character varying(80) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(10) NOT NULL, "deleteUser" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "karzinka" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productIdId" uuid, "userIdId" uuid, CONSTRAINT "PK_453c53c85abd204ec4c5ffa1d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productIdId" uuid, "userIdId" uuid, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_38fa6aeda2eca92adbd0a75fe07" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "karzinka" ADD CONSTRAINT "FK_1ef45447cca6d61db2b5920ab82" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_a116a647ee2e60f76344fecfc2c" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_314680784cc4ba14bf392fbb873" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_314680784cc4ba14bf392fbb873"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_a116a647ee2e60f76344fecfc2c"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_1ef45447cca6d61db2b5920ab82"`);
        await queryRunner.query(`ALTER TABLE "karzinka" DROP CONSTRAINT "FK_38fa6aeda2eca92adbd0a75fe07"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "karzinka"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }
}
exports.table1675101291403 = table1675101291403;
