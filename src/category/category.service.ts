import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createCategoryDto, updateCategoryDto } from './dto/category.dto';
import { Responser } from 'src/libs/exceptions/Responser';
import { CustomRpcException } from 'src/libs/exceptions/custom-exception';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(dto: createCategoryDto) {
    return this.prisma.category
      .create({
        data: {
          name: dto.name,
          desc: dto.description,
        },
      })
      .then((category) => {
        return Responser({
          statusCode: 201,
          message: 'Category successfully created!',
          body: category,
        });
      })
      .catch((err) => {
        return new CustomRpcException(
          400,
          err.code === 'P2002' ? 'Category name already exists!' : err,
        );
      });
  }

  async fetchCategories() {
    return this.prisma.category
      .findMany({
        where: {
          isDeleted: false,
        },
      })
      .then((categories) => {
        return Responser({
          statusCode: 200,
          message: 'Categories successfully fetched!',
          body: categories,
        });
      })
      .catch((err) => {
        return new CustomRpcException(400, err);
      });
  }

  async fetchCategory(id: string) {
    return this.prisma.category
      .findUnique({
        where: {
          id: id,
          isDeleted: false,
        },
      })
      .then((category) => {
        if (!category) throw new Error('Category not found!');
        return Responser({
          statusCode: 200,
          message: 'Category successfully fetched!',
          body: category,
        });
      })
      .catch((err) => {
        return new CustomRpcException(400, err);
      });
  }

  async updateCategory(dto: updateCategoryDto) {
    return this.prisma.category
      .update({
        where: {
          id: dto.id,
        },
        data: {
          name: dto.name,
          desc: dto.description,
        },
      })
      .then((updCategory) => {
        return Responser({
          statusCode: 200,
          message: 'Category updated successfully',
          body: updCategory,
        });
      })
      .catch((err) => {
        return new CustomRpcException(400, err);
      });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    return this.prisma.category
      .update({
        where: {
          id: id,
        },
        data: {
          name: `deleted-${await this.prisma.category.count({
            where: {
              name: {
                contains: 'deleted',
              },
              isDeleted: true,
            },
          })}-${category.name}`,
          isDeleted: true,
        },
      })
      .then(() => {
        return Responser({
          statusCode: 204,
          message: 'Category deleted successfully',
          body: null,
        });
      })
      .catch((err) => {
        return new CustomRpcException(400, err);
      });
  }
}
