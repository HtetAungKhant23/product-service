import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'product-create' })
  create(@Payload() dto: { name: string; price: number }) {
    return this.productService.create(dto);
  }

  @MessagePattern('findAllProduct')
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern('findOneProduct')
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern('removeProduct')
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }
}
