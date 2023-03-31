import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.getHttpAdapter().getInstance().set('etag', false);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: configService.get('cors.origin'),
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET',
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
