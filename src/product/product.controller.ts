import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.create.dto';
import { dot } from 'node:test/reporters';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'create-product' })
  create(@Payload() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @MessagePattern({ cmd: 'fetch-all-product' })
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'fetch-product-detail' })
  fetchDetail(@Payload() id: string) {
    console.log(dot);
    return this.productService.fetchDetail(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  update(@Payload() dto: UpdateProductDto) {
    return this.productService.update(dto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  remove(@Payload() id: string) {
    return this.productService.remove(id);
  }
}
