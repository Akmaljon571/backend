"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "akmal",
    database: "startup",
    entities: [path_1.default.resolve(__dirname, '..', 'entities', '*.entite.{ts,js}')],
    migrations: [path_1.default.resolve(__dirname, '..', "migrations", "**/*.ts")],
    synchronize: false,
    logging: true,
});
