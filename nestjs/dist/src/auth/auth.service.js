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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const constants_1 = require("../../constants/constants");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(user, jwt, configService) {
        this.user = user;
        this.jwt = jwt;
        this.configService = configService;
    }
    async signin(user) {
        try {
            const findeUser = await this.user.findOne({
                where: {
                    email: user.email,
                },
                attributes: ['email', 'hash', 'id'],
            });
            if (findeUser) {
                const isMatch = await bcrypt.compare(user.password, findeUser.hash);
                if (isMatch) {
                    return this.signToken(findeUser.id, findeUser.email, findeUser.hash);
                }
                else {
                    throw new common_1.ForbiddenException('wrong password');
                }
            }
            else {
                throw new common_1.ForbiddenException('user not found');
            }
        }
        catch (e) {
            throw new common_1.BadRequestException('wrong user data');
        }
    }
    async signup(user) {
        try {
            await this.user
                .create({
                name: user.name,
                email: user.email,
                hash: user.password,
            })
                .then((user) => {
                return this.signToken(user.id, user.email, user.hash);
            });
        }
        catch (e) {
            throw new common_1.ForbiddenException('wrong user data');
        }
    }
    async signToken(userId, email, password) {
        const payload = {
            sub: userId,
            email,
            password,
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30d',
            secret: this.configService.get('AUTH_SECRET'),
        });
        return {
            access_token: token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_MODEL)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map