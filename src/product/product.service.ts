import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.create.dto';
import { Responser } from 'src/libs/exceptions/Responser';
import { CustomRpcException } from 'src/libs/exceptions/custom-exception';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    try {
      const prod = await this.prisma.product.create({
        data: {
          name: dto.name,
          code: dto.code,
          desc: dto.desc,
          image: '',
          unit_price: +dto.unit_price,
          category_id: dto.category_id,
          brand_id: dto.brand_id,
          has_variant: dto.has_variant,
          variant: {
            create: {
              name: dto.variant[0].name,
              variant_value: {
                create: {
                  value: dto.variant[0].values[0].value,
                },
              },
            },
          },
        },
      });
      console.log(prod);
      return Responser({
        statusCode: 201,
        message: 'Product create successfully',
        body: prod,
      });
    } catch (err) {
      console.log('this is fucking error', err);
      throw new CustomRpcException(400, err);
    }
  }

  async findAll() {
    return await this.prisma.product
      .findMany({
        where: {
          is_deleted: false,
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
          is_deleted: false,
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
    // const { id, ...data } = dto;
    return await this.prisma.product
      .update({
        where: {
          id: dto.id,
        },
        data: {
          name: dto.name,
          code: dto.code,
          desc: dto.desc,
          image: '',
          unit_price: +dto.unit_price,
          category_id: dto.category_id,
          brand_id: dto.brand_id,
          has_variant: dto.has_variant,
          variant: {
            create: dto.variant,
          },
        },
      })
      .then((prod) => {
        return Responser({
          statusCode: 200,
          message: 'Product update successfully',
          body: prod,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async remove(id: string) {
    return await this.prisma.product
      .update({
        where: {
          id,
          is_deleted: false,
        },
        data: {
          code: 'deleted',
          is_deleted: true,
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
