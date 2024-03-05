import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { BrandService } from './brand.service';

@Controller()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @MessagePattern({ cmd: 'create-brand' })
  create(@Payload() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }

  @MessagePattern({ cmd: 'fetch-brands' })
  fetchAll() {
    return this.brandService.fetchAll();
  }

  @MessagePattern({ cmd: 'fetch-brand-detail' })
  fetchDetail(@Payload() dto: { id: string }) {
    return this.brandService.fetchDetail(dto.id);
  }

  @MessagePattern({ cmd: 'update-brand' })
  update(@Payload() dto: UpdateBrandDto) {
    return this.brandService.update(dto);
  }

  @MessagePattern({ cmd: 'delete-brand' })
  remove(@Payload() id: string) {
    return this.brandService.remove(id);
  }
}
