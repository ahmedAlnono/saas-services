"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceProviderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_service_provider_dto_1 = require("./create-service-provider.dto");
class UpdateServiceProviderDto extends (0, mapped_types_1.PartialType)(create_service_provider_dto_1.CreateServiceProviderDto) {
}
exports.UpdateServiceProviderDto = UpdateServiceProviderDto;
//# sourceMappingURL=update-service-provider.dto.js.map