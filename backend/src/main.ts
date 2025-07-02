import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const corsOrigin =
    configService.get<string>('CORS_ORIGIN') || 'http://localhost:5173';

  app.enableCors({
    origin: [corsOrigin],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.enableShutdownHooks();

  const port = Number(configService.getOrThrow('PORT'));
  await app.listen(port);
}
bootstrap();
