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
exports.ServiceProvider = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt = require("bcrypt");
const project_model_1 = require("./project.model");
let ServiceProvider = class ServiceProvider extends sequelize_typescript_1.Model {
    static async hashPassword(serviceProvider) {
        serviceProvider.hash = await bcrypt.hash(serviceProvider.hash, 10);
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ServiceProvider.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ServiceProvider.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ServiceProvider.prototype, "hash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], ServiceProvider.prototype, "accessKey", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], ServiceProvider.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Array)
], ServiceProvider.prototype, "stack", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.NUMBER,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => project_model_1.Project),
    __metadata("design:type", project_model_1.Project)
], ServiceProvider.prototype, "workOn", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ServiceProvider]),
    __metadata("design:returntype", Promise)
], ServiceProvider, "hashPassword", null);
ServiceProvider = __decorate([
    (0, sequelize_typescript_1.Table)({
        paranoid: true,
        underscored: true,
        timestamps: true,
    })
], ServiceProvider);
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=server-provider.model.js.map