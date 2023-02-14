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
exports.Product = void 0;
const likes_entite_1 = require("./likes.entite");
const typeorm_1 = require("typeorm");
const category_entite_1 = require("./category.entite");
const karzinka_entite_1 = require("./karzinka.entite");
const comment_entite_1 = require("./comment.entite");
let Product = class Product {
    id;
    title;
    img1;
    img2;
    img3;
    img4;
    img5;
    date;
    img6;
    price;
    oldPrice;
    summ;
    likes;
    karzinka;
    comment;
    category;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 65,
        nullable: false
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false
    }),
    __metadata("design:type", String)
], Product.prototype, "img1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
    }),
    __metadata("design:type", String)
], Product.prototype, "img2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
    }),
    __metadata("design:type", String)
], Product.prototype, "img3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
    }),
    __metadata("design:type", String)
], Product.prototype, "img4", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
    }),
    __metadata("design:type", String)
], Product.prototype, "img5", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
    }),
    __metadata("design:type", String)
], Product.prototype, "img6", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false
    }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: true
    }),
    __metadata("design:type", Object)
], Product.prototype, "oldPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false
    }),
    __metadata("design:type", String)
], Product.prototype, "summ", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_entite_1.Likes, (likes) => likes.product, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Product.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => karzinka_entite_1.Karzinka, (karzinka) => karzinka.product, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Product.prototype, "karzinka", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entite_1.Comment, (comment) => comment.product, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Product.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entite_1.Category, (category) => category.product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", category_entite_1.Category)
], Product.prototype, "category", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
