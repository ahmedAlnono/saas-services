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
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const database_provider_1 = require("./database.provider");
const config_1 = require("@nestjs/config");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    constructor(config) {
        this.config = config;
    }
    static register(option) {
        let envFilePath;
        if (option === 'development') {
            envFilePath = '.env';
        }
        else if (option === 'production') {
            envFilePath = '.env.production';
        }
        return {
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: false,
                    envFilePath,
                }),
            ],
            module: DatabaseModule_1,
            providers: [...database_provider_1.databaseProviders],
            exports: [...database_provider_1.databaseProviders],
        };
    }
};
DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [...database_provider_1.databaseProviders],
        exports: [...database_provider_1.databaseProviders],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map