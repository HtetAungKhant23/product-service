import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createCategoryDto, updateCategoryDto } from './dto/category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'create-category' })
  createCategory(@Payload() dto: createCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @MessagePattern({ cmd: 'fetch-categories' })
  fetchCategories() {
    return this.categoryService.fetchCategories();
  }

  @MessagePattern({ cmd: 'fetch-category-detail' })
  fetchCategory(@Payload() id: string) {
    return this.categoryService.fetchCategory(id);
  }

  @MessagePattern({ cmd: 'update-category' })
  updateCategory(@Payload() dto: updateCategoryDto) {
    console.log(dto);
    return this.categoryService.updateCategory(dto);
  }

  @MessagePattern({ cmd: 'delete-category' })
  deleteCategory(@Payload() id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
