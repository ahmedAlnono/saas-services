"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsProviders = void 0;
const constants_1 = require("../../constants/constants");
const user_model_1 = require("../models/user.model");
const notification_model_1 = require("../models/notification.model");
const project_model_1 = require("../models/project.model");
const server_provider_model_1 = require("../models/server-provider.model");
exports.ModelsProviders = [
    {
        provide: constants_1.USER_MODEL,
        useValue: user_model_1.User,
    },
    {
        provide: constants_1.NOTIFICATION_MODEL,
        useValue: notification_model_1.Notification,
    },
    {
        provide: constants_1.PROJECT_MODEL,
        useValue: project_model_1.Project,
    },
    {
        provide: constants_1.SERVICEPROVIDER_MODEL,
        useValue: server_provider_model_1.ServiceProvider,
    },
];
//# sourceMappingURL=user.provider.js.map