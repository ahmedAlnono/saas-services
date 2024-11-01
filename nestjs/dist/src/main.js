"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap(configService) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['warn', 'error', 'fatal'],
    });
    app.useGlobalGuards();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: [
            configService.get('MAIN_ORIGIN'),
            configService.get('STRIPE_ORIGIN'),
        ],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Personal website')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, documentFactory);
    await app.listen(configService.get('APP_PORT'));
}
bootstrap(new config_1.ConfigService());
//# sourceMappingURL=main.js.map