import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { name: string; price: number }) {
    console.log('good');

    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
