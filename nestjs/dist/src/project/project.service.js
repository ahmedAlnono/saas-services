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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants/constants");
const stripe_1 = require("stripe");
let ProjectService = class ProjectService {
    constructor(project, user) {
        this.project = project;
        this.user = user;
        this.stripe = new stripe_1.default('sk_test_51NF9qyKHRZmQNLJeJQ2HgtqnxpRXSmKt2GgnkEzM8FGq39WnjnguqEmSOAmLc4Ssps19Hsg6WUZEXChc1mnQ67YG00erFhf88A', {
            apiVersion: '2023-08-16',
        });
    }
    async create(createProjectDto, user) {
        const project = await this.project.create({
            name: createProjectDto.name,
            deadLine: createProjectDto.deadLine,
            owner: user.sub,
            maker: createProjectDto.maker,
        });
        return project;
    }
    async findAll() {
        return await this.project.findAll();
    }
    findOne(id) {
        return `This action returns a #${id} project`;
    }
    update(id, updateProjectDto) {
        return `This action updates a #${id} project`;
    }
    remove(id) {
        return `This action removes a #${id} project`;
    }
    async payForProject(res) {
        const price = await this.stripe.prices.create({
            currency: 'usd',
            unit_amount: 10000,
            product_data: {
                name: 'project-pay1',
            },
        });
        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            currency: 'usd',
            success_url: 'http://localhost:3000/projec/sucsess-payment',
            cancel_url: 'http://localhost:3000/project/cancel-payment',
        });
        res.redirect(session.url);
    }
    async sucsessPay(project, user) {
        return `user number ${user} pay for project number ${project}`;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PROJECT_MODEL)),
    __param(1, (0, common_1.Inject)(constants_1.USER_MODEL)),
    __metadata("design:paramtypes", [Object, Object])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map