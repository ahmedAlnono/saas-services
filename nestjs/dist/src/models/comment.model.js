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
exports.Comment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const project_model_1 = require("./project.model");
let Comment = class Comment extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Comment.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Comment.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'user_id',
    }),
    __metadata("design:type", user_model_1.User)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => project_model_1.Project),
    __metadata("design:type", project_model_1.Project)
], Comment.prototype, "projectId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Comment.prototype, "photos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        field: 'has_reply',
    }),
    __metadata("design:type", Boolean)
], Comment.prototype, "hasReply", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "views", void 0);
Comment = __decorate([
    (0, sequelize_typescript_1.Table)({
        paranoid: true,
        underscored: true,
        timestamps: true,
    })
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.model.js.map