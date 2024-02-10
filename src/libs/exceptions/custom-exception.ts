import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  constructor(statusCode: number, message: string) {
    super({
      statusCode: statusCode,
      error: statusCode >= 200 && statusCode <= 300 ? false : true,
      message: message,
      body: null,
    });
  }
}
