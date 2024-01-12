import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 5000,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002).then(() => {
    console.log('product service running at 3002');
  });
}
bootstrap();
