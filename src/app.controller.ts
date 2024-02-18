import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Responser } from './libs/exceptions/Responser';

@Controller('reload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'multi-test' })
  getHello(@Payload() data: string): string {
    console.log('ok twr p byar', data);
    return this.appService.getHello(data);
  }

  @Get()
  reload() {
    return Responser({
      statusCode: 200,
      message: 'Reload service success',
      body: null,
    });
  }
}
