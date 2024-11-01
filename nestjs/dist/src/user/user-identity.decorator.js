"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentity = void 0;
const common_1 = require("@nestjs/common");
exports.UserIdentity = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return await request.user;
});
//# sourceMappingURL=user-identity.decorator.js.map