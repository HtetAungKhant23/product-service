export class CreateProductDto {
  name: string;
  code: string;
  dec: string;
  unitPrice: number;
  categoryId: string;
  brandId: string;
  createdBy: string;
}

export class UpdateProductDto extends CreateProductDto {
  id: string;
}
