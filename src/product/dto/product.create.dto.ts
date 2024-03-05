class Value {
  value: string;
  stock: number;
}

class Variant {
  name: string;
  values: Value[];
}

export class CreateProductDto {
  name: string;
  code: string;
  desc: string;
  unit_price: number;
  category_id: string;
  brand_id: string;
  has_variant: boolean;
  variant: Variant[];
}

export class UpdateProductDto extends CreateProductDto {
  id: string;
}
