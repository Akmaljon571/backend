"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const product_entite_1 = require("./product.entite");
let Category = class Category {
    id;
    title;
    img;
    product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 65,
        nullable: false
    }),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false
    }),
    __metadata("design:type", String)
], Category.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entite_1.Product, (product) => product.category, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Category.prototype, "product", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
