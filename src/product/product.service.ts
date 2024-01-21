import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/product.create.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    console.log('good');
    return this.prisma.product
      .create({
        data: {
          name: dto.name,
          dec: dto.dec,
          unitPrice: +dto.unitPrice,
          categoryId: dto.categoryId,
          brandId: dto.brandId,
          createdBy: dto.createdBy,
        },
      })
      .then((prod) => {
        return {
          statusCode: 201,
          prod,
        };
      });
  }

  findAll() {
    return `This action returns all product`;
  }

  async fetchDetail(id: string) {
    return this.prisma.product
      .findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          brand: true,
          discount: true,
        },
      })
      .then((prod) => {
        return {
          statusCode: 200,
          prod,
        };
      });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
