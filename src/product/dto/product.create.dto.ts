export class CreateProductDto {
  name: string;
  code: string;
  desc: string;
  unit_price: number;
  stock: number;
  category_id: string;
  brand_id: string;
}

export class UpdateProductDto extends CreateProductDto {
  id: string;
}
