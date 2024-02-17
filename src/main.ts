import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      // host: 'localhost',
      // port: 6379,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002).then(() => {
    Logger.log('🚀 Product Service Successfully started at 3002');
  });
}
bootstrap();
