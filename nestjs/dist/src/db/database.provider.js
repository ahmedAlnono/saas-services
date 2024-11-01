"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const sequelize_typescript_1 = require("sequelize-typescript");
const comment_model_1 = require("../models/comment.model");
const notification_model_1 = require("../models/notification.model");
const project_model_1 = require("../models/project.model");
const server_provider_model_1 = require("../models/server-provider.model");
const user_model_1 = require("../models/user.model");
exports.databaseProviders = [
    {
        inject: [config_1.ConfigService],
        provide: 'SEQUELIZE',
        useFactory: async (configService) => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
            });
            sequelize.addModels([
                user_model_1.User,
                comment_model_1.Comment,
                project_model_1.Project,
                notification_model_1.Notification,
                server_provider_model_1.ServiceProvider,
            ]);
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.provider.js.map