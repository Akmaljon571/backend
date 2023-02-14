"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675605300807 = void 0;
class table1675605300807 {
    name = 'table1675605300807';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userImage" SET DEFAULT 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userImage" SET DEFAULT ''`);
    }
}
exports.table1675605300807 = table1675605300807;
