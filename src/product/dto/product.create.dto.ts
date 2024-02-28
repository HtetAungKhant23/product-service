export class CreateProductDto {
  name: string;
  code: string;
  dec: string;
  unitPrice: number;
  categoryId: string;
  brandId: string;
  hasVariant: boolean;
  variant: [
    {
      name: string;
      value: string;
    },
  ];
}

export class UpdateProductDto extends CreateProductDto {
  id: string;
}
