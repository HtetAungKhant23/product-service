import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { Responser } from 'src/libs/exceptions/Responser';
import { CustomRpcException } from 'src/libs/exceptions/custom-exception';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBrandDto) {
    return this.prisma.brand
      .create({
        data: {
          name: dto.name,
          desc: dto.desc,
          image: '',
        },
      })
      .then((brand) => {
        return Responser({
          statusCode: 201,
          message: 'Brand create successfully',
          body: brand,
        });
      })
      .catch((err) => {
        return new CustomRpcException(
          400,
          err.code === 'P2002' ? 'Brand already exists' : err,
        );
      });
  }

  async fetchAll() {
    return await this.prisma.brand
      .findMany({
        where: {
          isDeleted: false,
        },
      })
      .then((brands) => {
        return Responser({
          statusCode: 200,
          message: 'Fetch all brands successfully',
          body: brands,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async fetchDetail(id: string) {
    return this.prisma.brand
      .findUnique({
        where: {
          id,
          isDeleted: false,
        },
      })
      .then((brand) => {
        return Responser({
          statusCode: 200,
          message: 'Fetch brand detail successfully',
          body: brand,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async update(dto: UpdateBrandDto) {
    return this.prisma.brand
      .update({
        where: {
          id: dto.id,
          isDeleted: false,
        },
        data: {
          name: dto.name,
          desc: dto.desc,
          image: '',
        },
      })
      .then((brand) => {
        return Responser({
          statusCode: 200,
          message: 'Brand update successfully',
          body: brand,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }

  async remove(id: string) {
    return this.prisma.brand
      .update({
        where: {
          id,
          isDeleted: false,
        },
        data: {
          isDeleted: true,
        },
      })
      .then((brand) => {
        return Responser({
          statusCode: 200,
          message: 'Brand delete successfully',
          body: brand,
        });
      })
      .catch((err) => {
        throw new CustomRpcException(400, err);
      });
  }
}
