import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(configService: ConfigService) {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'fatal'],
  });
  app.useGlobalGuards();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      configService.get<string>('MAIN_ORIGIN'),
      configService.get<string>('STRIPE_ORIGIN'),
    ],
  });
  const config = new DocumentBuilder()
    .setTitle('Personal website')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);

  await app.listen(configService.get<string>('APP_PORT'));
}
bootstrap(new ConfigService());
