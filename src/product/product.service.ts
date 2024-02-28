import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.create.dto';
import { Responser } from 'src/libs/exceptions/Responser';
import { CustomRpcException } from 'src/libs/exceptions/custom-exception';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product
      .create({
        data: {
          name: dto.name,
          code: dto.code,
          desc: dto.dec,
          image: '',
          unitPrice: +dto.unitPrice,
          categoryId: dto.categoryId,
          brandId: dto.brandId,
          hasVariant: dto.hasVariant,
          variant: {
            create: dto.variant,
          },
        },
      })
      .then((prod) => {
        return Responser({
          statusCode: 201,
          message: 'Product create successfully',
          body: prod,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async findAll() {
    return await this.prisma.product
      .findMany({
        where: {
          isDeleted: false,
        },
      })
      .then((prod) => {
        return Responser({
          statusCode: 200,
          message: 'Fetch all products successfully',
          body: prod,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async fetchDetail(id: string) {
    return this.prisma.product
      .findUnique({
        where: {
          id,
          isDeleted: false,
        },
        include: {
          category: true,
          brand: true,
          discount: true,
        },
      })
      .then((prod) => {
        return Responser({
          statusCode: 200,
          message: 'Fetch product detail successfully',
          body: prod,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async update(dto: UpdateProductDto) {
    const { id, ...data } = dto;
    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: string) {
    return await this.prisma.product
      .update({
        where: {
          id,
          isDeleted: false,
        },
        data: {
          code: 'deleted',
          isDeleted: true,
        },
      })
      .then(() => {
        return Responser({
          statusCode: 204,
          message: 'Product delete successfully',
          body: null,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }
}
