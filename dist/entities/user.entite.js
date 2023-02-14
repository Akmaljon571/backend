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
exports.Users = void 0;
const likes_entite_1 = require("./likes.entite");
const typeorm_1 = require("typeorm");
const karzinka_entite_1 = require("./karzinka.entite");
const class_transformer_1 = require("class-transformer");
const comment_entite_1 = require("./comment.entite");
let Users = class Users {
    id;
    fullName;
    phoneNumber;
    city;
    email;
    password;
    deleteUser;
    userImage;
    likes;
    karzinka;
    comment;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 100,
        nullable: false
    }),
    __metadata("design:type", String)
], Users.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 13,
        nullable: false
    }),
    __metadata("design:type", String)
], Users.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 80,
        nullable: false
    }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        length: 200,
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: false,
        default: true
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "deleteUser", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({
        type: "character varying",
        nullable: false,
        default: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    }),
    __metadata("design:type", String)
], Users.prototype, "userImage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_entite_1.Likes, (likes) => likes.user, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Users.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => karzinka_entite_1.Karzinka, (karzinka) => karzinka.user, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Users.prototype, "karzinka", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entite_1.Comment, (comment) => comment.user, {
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], Users.prototype, "comment", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
