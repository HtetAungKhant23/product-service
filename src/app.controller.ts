import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('tt')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'multi-test' })
  getHello(@Payload() data: string): string {
    console.log('ok twr p byar', data);
    return this.appService.getHello(data);
  }

  @Get()
  sd() {
    return 'ok ma nay bu';
  }
}
