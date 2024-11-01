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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderController = void 0;
const common_1 = require("@nestjs/common");
const service_provider_service_1 = require("./service-provider.service");
const create_service_provider_dto_1 = require("./dto/create-service-provider.dto");
const update_service_provider_dto_1 = require("./dto/update-service-provider.dto");
const public_decorator_1 = require("../user/public.decorator");
let ServiceProviderController = class ServiceProviderController {
    constructor(serviceProviderService) {
        this.serviceProviderService = serviceProviderService;
    }
    create(createServiceProviderDto) {
        return this.serviceProviderService.create(createServiceProviderDto);
    }
    findAll() {
        return this.serviceProviderService.findAll();
    }
    findOne(id) {
        return this.serviceProviderService.findOne(+id);
    }
    update(id, updateServiceProviderDto) {
        return this.serviceProviderService.update(+id, updateServiceProviderDto);
    }
    remove(id) {
        return this.serviceProviderService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_provider_dto_1.CreateServiceProviderDto]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_provider_dto_1.UpdateServiceProviderDto]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "remove", null);
ServiceProviderController = __decorate([
    (0, common_1.Controller)('service-provider'),
    __metadata("design:paramtypes", [service_provider_service_1.ServiceProviderService])
], ServiceProviderController);
exports.ServiceProviderController = ServiceProviderController;
//# sourceMappingURL=service-provider.controller.js.map