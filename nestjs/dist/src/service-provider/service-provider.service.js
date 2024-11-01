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
exports.ServiceProviderService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants/constants");
let ServiceProviderService = class ServiceProviderService {
    constructor(serviceProvider) {
        this.serviceProvider = serviceProvider;
    }
    async create(createServiceProviderDto) {
        const addProvider = await this.serviceProvider.create(Object.assign({}, createServiceProviderDto));
    }
    async findAll() {
        const providers = await this.serviceProvider.findAll();
        return providers;
    }
    findOne(id) {
        return `This action returns a #${id} serviceProvider`;
    }
    update(id, updateServiceProviderDto) {
        return `This action updates a #${id} serviceProvider`;
    }
    remove(id) {
        return `This action removes a #${id} serviceProvider`;
    }
};
ServiceProviderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.SERVICEPROVIDER_MODEL)),
    __metadata("design:paramtypes", [Object])
], ServiceProviderService);
exports.ServiceProviderService = ServiceProviderService;
//# sourceMappingURL=service-provider.service.js.map