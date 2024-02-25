import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { env } from './configs/env.config';

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
      host: env.host,
      port: env.port,
      ...(env.password && { password: env.password }),
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002).then(() => {
    Logger.log('🚀 Product Service Successfully started at 3002');
  });
}
bootstrap();
